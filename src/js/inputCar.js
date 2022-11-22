function envia(marca, modelo, cor, placa, timeType, size) {
    const url = 'http://localhost:3000/'
    const date = new Date().getTime()

    const insertCar = {
        marca: marca.value,
        modelo: modelo.value,
        cor: cor.value,
        placa: placa.value,
        tipoCobranca: timeType.value,
        tamanhoCarro: size.value,
        horaEntrada: date
    }

    axios.post(url, insertCar)
        .then((response) => {
            console.log(date)
            location.reload()
        })
        .catch((e) => console.error(e))
}