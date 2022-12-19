document.querySelectorAll('.mrrfsrfss').forEach(function (b) {
    b.addEventListener('click', (e) => {
        const element = e.target
        const cl = element.className
        const n = cl.replace(/[^0-9]/g, '')
        finish(n)
    })
})

function finish(id) {
    const url = 'http://localhost:5500/'
    modalFinishTime.style.display = "block";
    axios.get(`${url}ativos/search`, { params: { id_carro: id } })
        .then((response) => {
            idFinish.value = id
            result = response.data[0]
            marcaFinish.value = result.marca
            modeloFinish.value = result.modelo
            corFinish.value = result.cor
            placaFinish.value = result.placa
            console.log(result)

            if (result.tipo == 1) {
                hourFinish.checked = true
            }
            if (result.tipo == 2) {
                periodFinish.checked = true
            }
            if (result.tamanho == 3) {
                motoFinish.checked = true
            }
            if (result.tamanho == 2) {
                grandeFinish.checked = true
            }
            if (result.tamanho == 1) {
                padraoFinish.checked = true
            }

        })
        .catch((e) => console.error(e))
}
document.querySelectorAll('.sfdkfd').forEach(function (b) {
    b.addEventListener('click', (e) => {
        calculeTime()
    })
})


function calculeTime() {
    const urlAPI = 'http://localhost:5500/'
    let payType = document.querySelector('input[name="payType"]:checked').value
    let lavagemIsChecked = 0
    let hInternaIsChecked = 0
    if (lavagem.checked) {
        lavagemIsChecked = 1
    }
    if (hInterna.checked) {
        hInternaIsChecked = 1
    }


    const finishCar = {
        id_carro: idFinish.value,
        lavagem: lavagemIsChecked,
        convenio: convenio.value,
        hInterna: hInternaIsChecked,
        desconto: desconto.value,
        pagamento: payType

    }
    axios.put(`${urlAPI}ativos`, finishCar).then(r => {
        console.log(r.data)
        abreConfirma2(r.data)
        document.querySelectorAll('.wemiseparrk').forEach(function (b) {
            b.addEventListener('click', (e) => {
                finishTime(r.data.id_carro, urlAPI)
            })
        })
    }).catch(e => console.log(e))
}

function finishTime(id_carro, urlAPI) {
    (async()=>{
        await axios.put(`${urlAPI}ativos/finish`, { id_carro });
        window.location.reload()
    })()

    

}