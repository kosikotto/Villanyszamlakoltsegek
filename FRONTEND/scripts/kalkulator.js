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
    })
    .catch(error => {
        
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