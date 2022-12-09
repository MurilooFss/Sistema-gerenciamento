document.querySelectorAll('.mrrfsrfss').forEach(function (b) {
    b.addEventListener('click', (e) => {
        const element = e.target
        const cl = element.className
        const n = cl.replace(/[^0-9]/g, '')
        console.log(n)
        finish(n)
    })
})

function finish(id) {
    const url = 'http://localhost:3000/'
    modalFinishTime.style.display = "block";
    axios.get(`${url}ativos/search`, { params: { id_carro: id } })
        .then((response) => {
            idFinish.value = id
            result = response.data[0]
            marcaFinish.value = result.marca
            modeloFinish.value = result.modelo
            corFinish.value = result.cor
            placaFinish.value = result.placa
            if (result.tipoCobranca === 'HORA') {
                hourFinish.checked = true
            }
            if (result.tipoCobranca === 'PERIODO') {
                periodFinish.checked = true
            }
            if (result.tamanhoCarro === 'MOTO') {
                motoFinish.checked = true
            }
            if (result.tamanhoCarro === 'GRANDE') {
                grandeFinish.checked = true
            }
            if (result.tamanhoCarro === 'PADRÃO') {
                padraoFinish.checked = true
            }

        })
        .catch((e) => console.error(e))
}