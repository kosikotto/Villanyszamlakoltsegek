window.addEventListener("resize", () => {
    if (globalTableVisible) {
        CheckTableOnResize();
    }
})

function CheckTableOnResize() {
    let calculationTable = document.getElementById('calculationTable');

    if (globalTableWidth > 800 || window.innerWidth <= 1000) {
        calculationTable.classList.add('narrow');
    }

    else {
        calculationTable.classList.remove('narrow');
    }
}