function edit(id) {
    modalEditCar.style.display = "block"
    axios.get(`${url}${id}`)
        .then((response) => {
            marcaEdit.value = response.data.marca
            modeloEdit.value = response.data.modelo
            corEdit.value = response.data.cor
            placaEdit.value = response.data.placa
            if (response.data.tipoCobranca === 'HORA') {
                horaEdit.checked = true
            }
            if (response.data.tipoCobranca === 'PERIODO') {
                periodoEdit.checked = true
            }
            if (response.data.tamanhoCarro === 'MOTO') {
                motoEdit.checked = true
            }
            if (response.data.tamanhoCarro === 'GRANDE') {
                grandeEdit.checked = true
            }
            if (response.data.tamanhoCarro === 'PADRÃO') {
                padraoEdit.checked = true
            }
            console.log(response)

        })
        .catch((e) => console.error(e))
}
function salvarEdit(marca, modelo, cor, placa, timeType, size) {
    const id = 1
    const updatedCar = {
        marca: marca.value.toUpperCase(),
        modelo: modelo.value.toUpperCase(),
        cor: cor.value.toUpperCase(),
        placa: placa.value.toUpperCase(),
        tipoCobranca: timeType.value.toUpperCase(),
        tamanhoCarro: size.value.toUpperCase(),
    }
    axios.put(`${url}${id}`, updatedCar).then((response) => (console.log(response.data))).catch((e) => console.log(e))
}   
