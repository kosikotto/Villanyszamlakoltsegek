let globalTableWidth;
let globalTableVisible = false;

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
        ErrorDraw(`❌ Hibás bemeneti adatok!<br><br>
            Kérlek, ellenőrizd a következőket:<ul>
            <li>Az <strong>"egységár"</strong> csak szám lehet.</li>
            <li>A <strong>"fogyasztás"</strong> mezőben minden oszlopban <strong>13 szám</strong> szerepeljen.</li>
            <li>Az értékeket <strong>vesszővel</strong> válaszd el.</li>
            <li>Több oszlop esetén mindegyik kövesse ezt a formátumot.</li>
            </ul>`);
    }
}

function InputCheck(egysegar, datas) {
    let helyes = true;

    if (egysegar != null && egysegar.length > 0) {
        if (egysegar <= 2000 && egysegar >= 0) {
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
                        alert('❌ HIBA! A "fogyasztási adatok" nem megfelelően lettek kitöltve, kérlek ellenőrizd, hogy minden hónapot kitöltöttél-e, valamint győződj meg, hogy az évszámokhoz egész számot írtál be.')
                        break;
                    }
                }       
            }
            else {
                helyes = false;
                alert('❌ HIBA! A "fogyasztási adatok" nem megfelelően lettek kitöltve, kérlek ellenőrizd, hogy minden hónapot kitöltöttél-e, valamint győződj meg, hogy az évszámokhoz egész számot írtál be.')
            }
        }

        else {
            helyes = false;
            alert('❌ HIBA! Az "egységár" helyére olyan számot adj meg, ami "0" és "2000" közé esik.')
        }
    }

    else {
        helyes = false;
        alert('❌ HIBA! Az "egységár" helyére számot adj meg.')
    }

    return helyes;
}

function FetchData(egysegar, datas) {
    const queryParams = new URLSearchParams({
        egysegar: egysegar,
        datas: datas
    });

    fetch(`http://localhost:5063/api/electricity-bills?${queryParams}`, {
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
        global = responseData;

        if (global.siker) {
            TableDraw();
            ClearInputs();
        }

        else {
            ErrorDraw(`❌ Hibás bemeneti adatok!<br><br>
                Kérlek, ellenőrizd a következőket:<ul>
                <li>Az <strong>"egységár"</strong> csak szám lehet.</li>
                <li>A <strong>"fogyasztás"</strong> mezőben minden oszlopban <strong>13 szám</strong> szerepeljen.</li>
                <li>Az értékeket <strong>vesszővel</strong> válaszd el.</li>
                <li>Több oszlop esetén mindegyik kövesse ezt a formátumot.</li>
                </ul>`);
        }
    })
    .catch(error => {
        let userFriendlyMessage = "";

        if (error.name === 'AbortError') {
            userFriendlyMessage = "❌ HIBA! A kérés túl sokáig tartott, megszakítva.";
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("TypeError")) {
            userFriendlyMessage = "❌ HIBA! A szerver jelenleg nem érhető el, kérjük, próbáld meg újra később.";
        } else {
            userFriendlyMessage = `❌ Váratlan hiba történt a művelet végrehajtása során.<br>
            Kérlek, ellenőrizd a megadott adatokat és azok formátumát:
            <ul>
            <li>Az "egységár" csak szám lehet, és az értéknek "0" és "2000" között kell lennie.</li>
            <li>A fogyasztási adatok vesszővel legyenek elválasztva.</li>
            <li>Csak számokat lehet megadni.</li>
            <li>Minden oszlopban pontosan 13 értéknek kell szerepelnie.</li>
            </ul>
            Részletek: ${error.message}`;
        }

        ErrorDraw(userFriendlyMessage);
    });
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
    mainH1.classList.add('text-center', 'text-warning', 'font-monospace');
    mainH1.innerHTML = now.getFullYear().toString().padStart(2, '0') + '. ' + now.getMonth().toString().padStart(2, '0') + '. ' + now.getDay().toString().padStart(2, '0') + '. ' + now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0') + ' - Számítás';

    wrappedDivForH1.appendChild(mainH1);

    let hr1 = document.createElement('hr');
    hr1.classList.add('w-100', 'border', 'border-warning', 'border-2', 'opacity-100', 'rounded', 'rounded-5', 'md-5');

    wrappedDivForH1.appendChild(hr1);

    wrapper.appendChild(wrappedDivForH1);

    let evszam = global.evszam;
    let haviKoltes = global.haviKoltes;

    let table = document.createElement('table');
    table.classList.add('table', 'table-dark', 'table-striped', 'table-hover', 'border', 'border-3', 'border-warning', 'm-0');
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
            th.classList.add('fs-2', 'text-info', 'text-center', 'align-middle', 'font-monospace');
        }

        else {
            th.innerHTML = element;
            th.classList.add('fs-2', 'text-warning', 'text-center', 'align-middle', 'font-monospace');
        }

        tr.appendChild(th);
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    for (let i = 0; i < months.length; i++) {
        const element = months[i];

        let tmp = haviKoltes[element];
        let tmp2 = haviKoltes[element].length;

        let sor = document.createElement('tr');
        let tdHonap = document.createElement('td');
        tdHonap.innerHTML = element;
        tdHonap.classList.add('align-middle', 'text-warning', 'fs-5', 'fw-bold', 'font-monospace');
        sor.appendChild(tdHonap);

        for (let j = 0; j < tmp2; j++) {
            const element = tmp[j];
            const kedvezmenyesEvek = global.kedvezmenyesEvek[j];
            let td = document.createElement('td');
            td.setAttribute('data-cell', evszam[j]);

            if (kedvezmenyesEvek) {
                td.innerHTML = element.toLocaleString('hu-HU') + '*' + ' HUF';
                td.classList.add('text-center', 'text-info', 'align-middle', 'font-monospace');
            }

            else {
                td.innerHTML = element.toLocaleString('hu-HU') + ' HUF';
                td.classList.add('text-center', 'align-middle', 'font-monospace');
            }
            sor.appendChild(td);
        }
        tbody.appendChild(sor);
    }

    let EvesKoltsegSor = document.createElement('tr');
    let EvesKoltsegTd = document.createElement('td');
    let EvesKoltsegh5 = document.createElement('h5');
    EvesKoltsegTd.classList.add('p-0', 'm-0');

    EvesKoltsegh5.innerHTML = 'Éves Költség';
    EvesKoltsegh5.classList.add('bg-danger', 'text-warning', 'fw-bold', 'py-3', 'px-2', 'm-0', 'align-middle', 'font-monospace');

    EvesKoltsegTd.appendChild(EvesKoltsegh5);

    EvesKoltsegSor.appendChild(EvesKoltsegTd);

    let tmp3 = global.evesKoltseg;
    let tmp4 = global.evesKoltseg.length;

    for (let i = 0; i < tmp4; i++) {
        const element = tmp3[i];
        const kedvezmenyesEvek = global.kedvezmenyesEvek[i];

        let td = document.createElement('td');
        td.classList.add('p-0', 'm-0');
        td.setAttribute('data-cell', evszam[i]);


        let Evesh5 = document.createElement('h5');
        if (kedvezmenyesEvek) {
            Evesh5.innerHTML = element.toLocaleString('hu-HU') + '*' +' HUF';
            Evesh5.classList.add('text-info');
        }
        else {
            Evesh5.innerHTML = element.toLocaleString('hu-HU') + ' HUF';
        }
        Evesh5.classList.add('bg-danger', 'fw-bold', 'm-0', 'p-3', 'h-100', 'text-center', 'align-middle');

        td.appendChild(Evesh5);
        EvesKoltsegSor.appendChild(td);
    }

    tbody.appendChild(EvesKoltsegSor);

    table.appendChild(tbody);

    wrapper.appendChild(table);

    let editButton = document.createElement('button');
    editButton.id = 'EditButton';
    editButton.classList.add('btn', 'btn-danger', 'border', 'border-2', 'border-warning', 'text-warning', 'w-75', 'm-3');
    editButton.innerHTML = 'Szerkesztés'
    editButton.onclick = () => Edit();
    wrapper.appendChild(editButton);

    let hr2 = document.createElement('hr');
    hr2.id = 'calculationHr';
    hr2.classList.add('w-100', 'border', 'border-warning', 'border-2', 'opacity-100', 'rounded', 'rounded-5', 'm-0');

    wrapper.appendChild(hr2);

    wrapper.classList.add('resultDivVisible');

    globalTableWidth = table.offsetWidth;
    globalTableVisible = true;

    CheckTableOnResize();

    ScrollToResultDiv();
}

function ErrorDraw(error) {
    let resultDiv = document.getElementById('resultDiv');
    RemoveResultDivElements(resultDiv);

    resultDiv.classList.add('resultDivVisible');
    resultDiv.classList.remove('resultDivHidden');

    let div = document.createElement('div');
    div.id = 'AlertBadInput';
    div.classList.add('alert', 'alert-danger', 'rounded', 'rounded-5', 'border', 'border-3', 'border-warning', 'm-0');
    div.role = 'alert';

    let h3 = document.createElement('h3');
    h3.classList.add('text-danger', 'm-0');
    h3.innerHTML = error;

    div.appendChild(h3);
    resultDiv.appendChild(div);

    globalTableVisible = false;

    ScrollToResultDiv();
}

function RemoveResultDivElements(resultDiv) {
    let elementsToRemove = [
        'calculationTitle',
        'calculationTable',
        'EditButton',
        'calculationHr',
        'AlertBadInput'
    ];

    elementsToRemove.forEach(id => {
        let removeElement = document.getElementById(id);
        if (removeElement) {
            resultDiv.removeChild(removeElement);
        }
    });
}

function ScrollToResultDiv() {
    const element = document.getElementById('resultDiv');
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
