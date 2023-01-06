document.querySelectorAll('.wxosppsaw').forEach(function (b) {
    b.addEventListener('click', (e) => {
        const element = e.target
        const cl = element.className
        const n = cl.replace(/[^0-9]/g, '')
        edit(n)
    })
})
function edit(idReq) {
    const urlAPI = 'http://localhost:5500/'
    const id_carro = { idReq }
    console.log(id_carro)
    axios.get(`${urlAPI}ativos/search`, { params: { id_carro } })
        .then((response) => {
            if (response.data == '1') {
                window.location.reload()
            } else {
                modalEditCar.style.display = "block"
                console.log(response)
                idEdit.value = idReq
                data = response.data[0]
                marcaEdit.value = data.marca
                modeloEdit.value = data.modelo
                corEdit.value = data.cor
                placaEdit.value = data.placa
                telefoneEdit.value = data.telefone
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
            }


        })
        .catch((e) => console.error(e))
    document.querySelectorAll('.fallends2').forEach(function (b) {
        b.addEventListener('click', (e) => {
            exclude(idReq, urlAPI)
        })
    })
}