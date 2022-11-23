function edit(idReq) {
    modalEditCar.style.display = "block"
    axios.get(`${url}${idReq}`)
        .then((response) => {
            idEdit.value = response.data.id
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
function salvarEdit(marca, modelo, cor, placa, timeType, size, id) {
    const updatedCar = {
        marca: marca.value.toUpperCase(),
        modelo: modelo.value.toUpperCase(),
        cor: cor.value.toUpperCase(),
        placa: placa.value.toUpperCase(),
        tipoCobranca: timeType.value.toUpperCase(),
        tamanhoCarro: size.value.toUpperCase(),
    }
    axios.put(`${url}${id.value}`, updatedCar).then((response) => (console.log(response.data))).catch((e) => console.log(e))
}   
