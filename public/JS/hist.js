document.querySelectorAll('.hpseks').forEach(function (b) {
    b.addEventListener('click', (e) => {
        const element = e.target
        const cl = element.className
        const n = cl.replace(/[^0-9]/g, '');
        getDetails(n)

    })

})
function getDetails(id_carro) {
    const urlApi = 'http://localhost:5500/';

    axios.get(`${urlApi}historico/detalhes`, { params: { id_carro } }).then((r) => {
        histDetails(r.data, urlApi)
    })


}

function histDetails(car, urlApi) {
    openHistModal()
    console.log(car)
    idCarSpan.innerText = car.id_carro
    marcaSpan.innerText = car.marca
    modeloSpan.innerText = car.modelo
    placaSpan.innerText = car.placa
    horaEntradaSpan.innerText = car.hora_entrada
    horaSaidaSpan.innerText = car.hora_saida
    adicionaisSpan.innerText = 'car.adicionais'
    convenioSpan.innerText = car.id_convenio
    tempoTotalSpan.innerText = car.tempo_total
    descontoSpan.innerText = car.desconto
    pagamentoSpan.innerText = car.pagamento
    valorTotalSpan.innerText = 'R$' + car.valor_total
    document.querySelectorAll('.ewrooqw').forEach(function (b) {
        b.addEventListener('click', (e) => {
            modalConfirmaReabrir.style.display = 'block'
        })

    })
    document.querySelectorAll('.apskkpe').forEach(function (b) {
        b.addEventListener('click', (e) => {
            let email = document.getElementById('emailReopen').value
            let password = document.getElementById('pwdReopen').value
            reOpen(car.id_carro, urlApi, email, password)
        })
    })
    document.querySelectorAll('.parwwql').forEach(function (b) {
        b.addEventListener('click', (e) => {
            modalConfirma.style.display = 'block'
        })
    })
    document.querySelectorAll('.fallends2').forEach(function (b) {


        b.addEventListener('click', (e) => {
            let emailEx = document.getElementById('emailEx').value
            let passwordEx = document.getElementById('pwdEx').value
            exclude(car.id_carro, urlApi, emailEx, passwordEx)
        })
    })

}
function reOpen(id_carro, urlApi, email, password) {
    axios.put(`${urlApi}historico/detalhes`, { id_carro, email, password }).then((r) => {
        if (r.data) {
            window.location.reload()
        }
    }).catch((e) => {
        if (e.response.status == 401) {
            window.alert('senha errada!!!!')
        }
    })

}

function openHistModal() {
    modalHist.style.display = 'block'
}


