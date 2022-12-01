function edit(idReq) {
    const urlAPI = 'http://localhost:3000/'
    let search = {
        'id_carro': Number(idReq)
    }
    console.log(search)
    console.log(search)
    modalEditCar.style.display = "block"
    axios.get(`${urlAPI}ativos/search`, { params: { id_carro: idReq } })
        .then((response) => {
            data = response.data[0]
            idEdit.value = data.id_carro
            marcaEdit.value = data.marca
            modeloEdit.value = data.modelo
            corEdit.value = data.cor
            placaEdit.value = data.placa
            if (data.tipo === 1) {
                horaEdit.checked = true
            }
            if (data.tipo === 2) {
                periodoEdit.checked = true
            }
            if (data.tamanho === 3) {
                motoEdit.checked = true
            }
            if (data.tamanho === 2) {
                grandeEdit.checked = true
            }
            if (data.tamanho === 1) {
                padraoEdit.checked = true
            }

        })
        .catch((e) => console.error(e))
}
function salvarEdit(marca, modelo, cor, placa, timeType, size, id) {
    const updatedCar = {
        id_carro: id.value,
        id_estacionamento: 2,
        marca: marca.value.toUpperCase(),
        modelo: modelo.value.toUpperCase(),
        cor: cor.value.toUpperCase(),
        placa: placa.value.toUpperCase(),
        tipo: timeType.value.toUpperCase(),
        tamanho: size.value.toUpperCase(),
        finalizado: 0
    }
    axios.put(`${url}`, updatedCar).then((response) => (console.log(response.data))).catch((e) => console.log(e))
}   
