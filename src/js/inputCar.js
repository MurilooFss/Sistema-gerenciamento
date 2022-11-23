function add() {
    modalAddCar.style.display = "block";
}
function envia(marca, modelo, cor, placa, timeType, size) {
    const date = new Date().getTime()
    modalAddCar.style.display = "block";
    const insertCar = {
        marca: marca.value.toUpperCase(),
        modelo: modelo.value.toUpperCase(),
        cor: cor.value.toUpperCase(),
        placa: placa.value.toUpperCase(),
        tipoCobranca: timeType.value.toUpperCase(),
        tamanhoCarro: size.value.toUpperCase(),
        horaEntrada: date
    }

    axios.post(url, insertCar)
        .then((response) => {
            console.log(date)
            location.reload()
        })
        .catch((e) => console.error(e))
}