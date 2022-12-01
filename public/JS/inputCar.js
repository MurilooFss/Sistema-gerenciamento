function add() {
    modalAddCar.style.display = "block";
}
function envia(marca, modelo, cor, placa, timeType, size) {
    const date = new Date().getTime()
    modalAddCar.style.display = "block";
    const insertCar = {
        id_estacionamento: 2,
        marca: marca.value.toUpperCase(),
        modelo: modelo.value.toUpperCase(),
        cor: cor.value.toUpperCase(),
        placa: placa.value.toUpperCase(),
        tipo: timeType.value.toUpperCase(),
        tamanho: size.value.toUpperCase(),
        hora_entrada: date,
        finalizado: 0
    }
    axios.post(url, insertCar)
        .then((response) => {
            console.log(date)
            location.reload()
        })
        .catch((e) => console.error(e))
}