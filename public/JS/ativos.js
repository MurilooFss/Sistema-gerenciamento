window.onload = function () {
    // window.onclick = function (event) {
    //     if (event.target == modalAddCar) {
    //         modalAddCar.style.display = "none";
    //     }
    //     if (event.target == modalFinishTime) {
    //         modalFinishTime.style.display = "none";
    //     }
    //     if (event.target == modalEditCar) {
    //         modalEditCar.style.display = "none";
    //     }
    let vagas = vagasDisponiveis.textContent
    console.log(Number(vagas))
    if (vagas <= 0) {
        window.alert('Vagas totais foram preenchidas')
    }
    // }

    window.onkeydown = function (event) {
        if (event.key == 'Escape') {
            cancelModalAddCar.click();
            cancelModalFinishTime.click();
            cancelModalFinishCar.click()
        }
    };

}

function fecha() {
    modalAddCar.style.display = "none";
    modalFinishTime.style.display = "none";
    modalEditCar.style.display = "none";
    modalConfirma.style.display = "none";
    modalConfirma2.style.display = "none";
}
function cancela() {
    modalAddCar.style.display = "none";
    modalFinishTime.style.display = "none";
    modalEditCar.style.display = 'none'
    modalConfirma.style.display = "none";
    modalConfirma2.style.display = "none";
}
function cancelaConfirma() {
    modalConfirma.style.display = "none";
    modalConfirma2.style.display = "none";
}



