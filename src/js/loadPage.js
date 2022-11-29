const url = ('http://localhost:3000/')
const pageMethod = ('ativos')

let table = document.getElementsByClassName('tabela-dados')[0]


function loadPage(url, pageMethod) {
    axios.get(`${url}${pageMethod}`)
        .then((response) => {
            let data = response.data
            console.log(data)
            for (const iterator of data) {
                if (iterator.id != '') {
                    let html = `
                                <div class="linha id">${iterator.id_carro}</div>
                                <div class="linha marca">${iterator.marca}</div>
                                <div class="linha modelo">${iterator.modelo}</div>
                                <div class="linha cor">${iterator.cor}</div>
                                <div class="linha placa">${iterator.placa}</div>
                                <div class="linha tipo">${iterator.tipo}</div>
                                <div class="linha tamanho">${iterator.tamanho}</div>
                                <div class="linha hora">${iterator.hora_entrada}</div>
                                <div class="linha funcoes">
                                    <button class="openModalFinish" onclick="finish(${iterator.id_carro})">Finalizar</button>
                                    <button onclick="edit(${iterator.id_carro})" onclick = "editId(${iterator.id_carro})">Ed</button>
                                    <button>Pr</button>
                                </div>
                            `
                    let div = document.createElement('div')
                    div.setAttribute('class', 'linhas-tabela')
                    div.innerHTML = html
                    document.getElementsByClassName('tabela-dados')[0].appendChild(div)
                }
            }


        })
        .catch((e) => console.log(e))
}

loadPage(url, pageMethod)