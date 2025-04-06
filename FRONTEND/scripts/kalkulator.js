let global;
let egysegar;
let datas;

function sendingData() {
    egysegar = document.getElementById('egysegar').value;
    egysegar = egysegar.trim();
    datas =  document.getElementById('datas').value;
    datas = datas.trim();

    if (InputCheck(egysegar, datas)) {
        FetchData(egysegar, datas);
    }

    else {
        ErrorDraw('Hibás bemeneti adatokat adtál meg, győződj meg róla, hogy az "egységár" esetében számot adj meg, valamint a "fogyasztásnál" minden oszlopba 13 érték szerepeljen, vesszővel legyenek elválasztva, ha több oszlopot szeretnél felvinni.');
    }
}

function FetchData(egysegar, datas) {
    const queryParams = new URLSearchParams({
        egysegar: egysegar,
        datas: datas
    });

    fetch(`http://localhost:5063/ElectricityBillApi?${queryParams}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
    })
    .then(responseData => {
        global = responseData[0];

        if (global.siker) {
            TableDraw();
            ClearInputs();
            location.hash = '#';
            location.hash = 'resultDiv';
        }

        else {
            ErrorDraw('Hibás bemeneti adatokat adtál meg, győződj meg róla, hogy az "egységár" esetében számot adj meg, valamint a "fogyasztásnál" minden oszlopba 13 érték szerepeljen, vesszővel legyenek elválasztva, ha több oszlopot szeretnél felvinni.');
            location.hash = '#';
            location.hash = 'resultDiv';
        }
    })
    .catch(error => {
        ErrorDraw("Hiba történt a lekérdezés során: " + error);
    });
}

function InputCheck(egysegar, datas) {
    let helyes = true;

    if (egysegar != null && egysegar.length > 0) {
        if (egysegar <= 2000 && egysegar >= -2000) {
            let rows = datas.split('\n');
            let cols = rows[0].split(',');
            if (rows.length > 0) {
                for (let i = 0; i < cols.length; i++) {
                    let countRows = 0;
                    for (let j = 0; j < rows.length; j++) {
                        const element = rows[j].split(',')[i];
                        
                        if (j == 0) {
                            if (element % 1 == 0) {
                                countRows++;
                            }
                            else {
                                helyes = false;
                                break;
                            }
                        }

                        else {
                            if (element != null && element.length > 0) {
                                if (element >= 0 || element < 0) {
                                    countRows++;
                                }
                                else {
                                    helyes = false;
                                    break;
                                }
                            }
                            else {
                                helyes = false;
                                break;
                            }
                        }
                    }     
                    
                    if (countRows == 13) {
                        helyes = true;
                    }

                    else {
                        helyes = false;
                        alert('HIBA! A "fogyasztási adatok" nem megfelelően lettek kitöltve, kérlek ellenőrizd, hogy minden hónapot kitöltöttél-e, valamint győződj meg, hogy az évszámokhoz egész számot írtál be.')
                        break;
                    }
                }       
            }
            else {
                helyes = false;
                alert('HIBA! Az "egységár" helyére olyan számot adj meg, ami "-2000" és "2000" közé esik.')
            }
        }

        else {
            helyes = false;
            alert('HIBA! Az "egységár" helyére számot adj meg.')
        }
    }

    else {
        helyes = false;
        alert('HIBA! Az "egységár" helyére számot adj meg.')
    }

    return helyes;
}

function TableDraw() {
    let months = new Array();
    months.push('Január');
    months.push('Február');
    months.push('Március');
    months.push('Április');
    months.push('Május');
    months.push('Június');
    months.push('Július');
    months.push('Augusztus');
    months.push('Szeptember');
    months.push('Október');
    months.push('November');
    months.push('December');


    let wrapper = document.getElementById('resultDiv');
    RemoveResultDivElements(wrapper);

    let wrappedDivForH1 = document.createElement('div');
    wrappedDivForH1.id = 'calculationTitle';
    wrappedDivForH1.style.width = 'fit-content';

    let mainH1 = document.createElement('h1');
    let now = new Date();
    mainH1.classList.add('text-center');
    mainH1.classList.add('text-warning');
    mainH1.classList.add('font-monospace');
    mainH1.innerHTML = now.getFullYear().toString().padStart(2, '0') + '. ' + now.getMonth().toString().padStart(2, '0') + '. ' + now.getDay().toString().padStart(2, '0') + '. ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0') + ' - Számítás';

    wrappedDivForH1.appendChild(mainH1);

    let hr1 = document.createElement('hr');
    hr1.classList.add('w-100');
    hr1.classList.add('border');
    hr1.classList.add('border-warning');
    hr1.classList.add('border-2');
    hr1.classList.add('opacity-100');
    hr1.classList.add('rounded');
    hr1.classList.add('rounded-5');
    hr1.classList.add('mb-5');

    wrappedDivForH1.appendChild(hr1);

    wrapper.appendChild(wrappedDivForH1);

    let evszam = global.evszam;
    let haviKoltes = global.haviKoltes;

    let table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-dark');
    table.classList.add('table-striped');
    table.classList.add('table-hover');
    table.classList.add('border');
    table.classList.add('border-3');
    table.classList.add('border-warning');
    table.classList.add('m-0');
    table.id = 'calculationTable';

    let thead = document.createElement('thead');

    let tr = document.createElement('tr');
    let honapTh = document.createElement('th');
    honapTh.innerHTML = '';
    tr.appendChild(honapTh);

    for (let i = 0; i < evszam.length; i++) {
        const element = evszam[i];
        const kedvezmenyesEvek = global.kedvezmenyesEvek[i];

        let th = document.createElement('th');

        if (kedvezmenyesEvek) {
            th.innerHTML = element + '*';
            th.classList.add('fs-2');
            th.classList.add('text-info');
            th.classList.add('text-center');
            th.classList.add('align-middle');
            th.classList.add('font-monospace');
        }

        else {
            th.innerHTML = element;
            th.classList.add('fs-2');
            th.classList.add('text-warning');
            th.classList.add('text-center');
            th.classList.add('align-middle');
            th.classList.add('font-monospace');
        }

        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    for (let i = 0; i < months.length; i++) {
        const element = months[i];

        let tmp = global.haviKoltes[element];
        let tmp2 = global.haviKoltes[element].length;

        let sor = document.createElement('tr');
        let tdHonap = document.createElement('td');
        tdHonap.innerHTML = element;
        tdHonap.classList.add('align-middle');
        tdHonap.classList.add('text-warning');
        tdHonap.classList.add('fs-5');
        tdHonap.classList.add('fw-bold');
        tdHonap.classList.add('font-monospace');
        sor.appendChild(tdHonap);

        for (let j = 0; j < tmp2; j++) {
            const element = tmp[j];
            const kedvezmenyesEvek = global.kedvezmenyesEvek[j];
            let td = document.createElement('td');

            if (kedvezmenyesEvek) {
                td.innerHTML = element.toLocaleString('hu-HU') + '*' + ' HUF';
                td.classList.add('text-center');
                td.classList.add('text-info');
                td.classList.add('align-middle');
                td.classList.add('font-monospace');
            }

            else {
                td.innerHTML = element.toLocaleString('hu-HU') + ' HUF';
                td.classList.add('text-center');
                td.classList.add('align-middle');
                td.classList.add('font-monospace');
            }
            sor.appendChild(td);
        }
        tbody.appendChild(sor);
    }

    let EvesKoltsegSor = document.createElement('tr');
    let EvesKoltsegTd = document.createElement('td');
    let EvesKoltsegh5 = document.createElement('h5');
    EvesKoltsegTd.classList.add('p-0');
    EvesKoltsegTd.classList.add('m-0');

    EvesKoltsegh5.innerHTML = 'Éves Költség';
    EvesKoltsegh5.classList.add('bg-danger');
    EvesKoltsegh5.classList.add('text-warning');
    EvesKoltsegh5.classList.add('fw-bold');
    EvesKoltsegh5.classList.add('py-3');
    EvesKoltsegh5.classList.add('px-2');
    EvesKoltsegh5.classList.add('m-0');
    EvesKoltsegh5.classList.add('align-middle');
    EvesKoltsegh5.classList.add('font-monospace');

    EvesKoltsegTd.appendChild(EvesKoltsegh5);

    EvesKoltsegSor.appendChild(EvesKoltsegTd);

    let tmp3 = global.evesKoltseg;
    let tmp4 = global.evesKoltseg.length;

    for (let i = 0; i < tmp4; i++) {
        const element = tmp3[i];
        const kedvezmenyesEvek = global.kedvezmenyesEvek[i];

        let td = document.createElement('td');
        td.classList.add('p-0');
        td.classList.add('m-0');

        let Evesh5 = document.createElement('h5');
        if (kedvezmenyesEvek) {
            Evesh5.innerHTML = element.toLocaleString('hu-HU') + '*' +' HUF';
            Evesh5.classList.add('text-info');
        }
        else {
            Evesh5.innerHTML = element.toLocaleString('hu-HU') + ' HUF';
        }
        Evesh5.classList.add('bg-danger');
        Evesh5.classList.add('fw-bold');
        Evesh5.classList.add('m-0');
        Evesh5.classList.add('p-3');
        Evesh5.classList.add('h-100');
        Evesh5.classList.add('text-center');
        Evesh5.classList.add('align-middle');

        td.appendChild(Evesh5);
        EvesKoltsegSor.appendChild(td);
    }

    tbody.appendChild(EvesKoltsegSor);

    table.appendChild(tbody);

    wrapper.appendChild(table);

    let randomButton = document.createElement('button');
    randomButton.id = 'EditButton';
    randomButton.classList.add('btn');
    randomButton.classList.add('btn-danger');
    randomButton.classList.add('border');
    randomButton.classList.add('border-2');
    randomButton.classList.add('border-warning');
    randomButton.classList.add('text-warning');
    randomButton.classList.add('w-75');
    randomButton.classList.add('m-3');
    randomButton.innerHTML = 'Szerkesztés'
    randomButton.onclick = () => Edit();
    wrapper.appendChild(randomButton);

    let hr2 = document.createElement('hr');
    hr2.id = 'calculationHr';
    hr2.classList.add('w-100');
    hr2.classList.add('border');
    hr2.classList.add('border-warning');
    hr2.classList.add('border-2');
    hr2.classList.add('opacity-100');
    hr2.classList.add('rounded');
    hr2.classList.add('rounded-5');
    hr2.classList.add('m-0');

    wrapper.appendChild(hr2);


    wrapper.classList.add('resultDivVisible');

}

function ErrorDraw(error) {
    
    let resultDiv = document.getElementById('resultDiv');
    RemoveResultDivElements(resultDiv);

    resultDiv.classList.add('resultDivVisible');
    resultDiv.classList.remove('resultDivHidden');

    let div = document.createElement('div');
    div.id = 'AlertBadInput';
    div.classList.add('alert');
    div.classList.add('alert-danger');
    div.classList.add('rounded');
    div.classList.add('rounded-5');
    div.classList.add('border');
    div.classList.add('border-3');
    div.classList.add('border-warning');
    div.role = 'alert';

    let h3 = document.createElement('h3');
    h3.classList.add('text-danger');
    h3.classList.add('text-center');
    h3.classList.add('m-0');
    h3.innerHTML = error;

    div.appendChild(h3);
    resultDiv.appendChild(div);
}

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