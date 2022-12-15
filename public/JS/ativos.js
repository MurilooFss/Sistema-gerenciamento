window.onload = function () {

    let vagas = vagasDisponiveis.textContent
    console.log(Number(vagas))
    // if (vagas <= 0) {
    //     window.alert('Vagas totais foram preenchidas')
    // }
    // }

    window.onkeydown = function (event) {
        if (event.key == 'Escape') {
            cancelModalAddCar.click();
            cancelModalFinishTime.click();
            cancelModalFinishCar.click()
            cancelModalEditCar.click()
        }
    };

}

function fecha(modal) {
    x = document.getElementById(modal)
    x.style.display = "none";
}




