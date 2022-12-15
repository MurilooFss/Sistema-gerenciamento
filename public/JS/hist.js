document.querySelectorAll('.hpseks').forEach(function (b) {
    b.addEventListener('click', (e) => {
        const element = e.target
        const cl = element.className
        const n = cl.replace(/[^0-9]/g, '');
        getDetails(n)

    })

})
function getDetails(id_carro) {
    const urlApi = 'http://localhost:3000/';

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
            reOpen(car.id_carro, urlApi)
        })
    })
    document.querySelectorAll('.parwwql').forEach(function (b) {
        b.addEventListener('click', (e) => {
            modalConfirma.style.display = 'block'
        })
    })
    document.querySelectorAll('.fallends2').forEach(function (b) {
        b.addEventListener('click', (e) => {
            exclude(car.id_carro, urlApi)
        })
    })

}
function reOpen(id_carro, urlApi) {
    axios.put(`${urlApi}historico/detalhes`, { id_carro }).then(window.location.reload()).catch((e) => console.log(e))

}

function openHistModal() {
    modalHist.style.display = 'block'
}


