function finish(id) {
    const url = 'http://localhost:3000/'
    modalFinishTime.style.display = "block";
    axios.get(`${url}${id}`)
        .then((response) => {
            marcaFinish.value = response.data.marca
            modeloFinish.value = response.data.modelo
            corFinish.value = response.data.cor
            placaFinish.value = response.data.placa
            if (response.data.tipoCobranca === 'HORA') {
                hourFinish.checked = true
            }
            if (response.data.tipoCobranca === 'PERIODO') {
                periodFinish.checked = true
            }
            if (response.data.tamanhoCarro === 'MOTO') {
                motoFinish.checked = true
            }
            if (response.data.tamanhoCarro === 'GRANDE') {
                grandeFinish.checked = true
            }
            if (response.data.tamanhoCarro === 'PADRÃO') {
                padraoFinish.checked = true
            }

        })
        .catch((e) => console.error(e))
}