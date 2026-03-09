function ClearInputs() {
    let inputEgysegar = document.getElementById('egysegar');
    let textareaDatas = document.getElementById('datas');

    inputEgysegar.value = '';
    textareaDatas.value = '';
}

function Edit() {
    let inputEgysegar = document.getElementById('egysegar');
    let textareaDatas = document.getElementById('datas');

    inputEgysegar.value = egysegar;
    textareaDatas.value = datas;

    location.hash = '#';
    location.hash = 'formDiv';
}

function CheckIfNotEmpty() {
    let inputEgysegar = document.getElementById('egysegar');
    let textareaDatas = document.getElementById('datas');

    if (inputEgysegar.value != null && inputEgysegar.value.length > 0 && textareaDatas.value != null && textareaDatas.value.length > 0) {
        if (inputEgysegar.value >= 0 || inputEgysegar.value < 0) {
            let calculate = document.getElementById('calculate');
            calculate.removeAttribute('disabled', '');
        }
    }
    
    else {
        let calculate = document.getElementById('calculate');
        calculate.setAttribute('disabled', '');
    }
}