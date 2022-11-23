const url = ('http://localhost:3000/')

let table = document.getElementsByClassName('tabela-dados')[0]


function loadPage(url) {
    axios.get(url)
        .then((response) => {
            let data = response.data

            for (const iterator of data) {
                if (iterator.id != '') {
                    function convert(t) {
                        const dt = new Date(t);
                        const hr = dt.getUTCHours() - 3;
                        const m = "0" + dt.getUTCMinutes();

                        return hr + ':' + m.substr(-2)
                    }
                    const time = convert(iterator.horaEntrada)
                    let html = `
                                <div class="linha id">${iterator.id}</div>
                                <div class="linha marca">${iterator.marca}</div>
                                <div class="linha modelo">${iterator.modelo}</div>
                                <div class="linha cor">${iterator.cor}</div>
                                <div class="linha placa">${iterator.placa}</div>
                                <div class="linha tipo">${iterator.tipoCobranca}</div>
                                <div class="linha tamanho">${iterator.tamanhoCarro}</div>
                                <div class="linha hora">${time}</div>
                                <div class="linha funcoes">
                                    <button class="openModalFinish" onclick="finish(${iterator.id})">Finalizar</button>
                                    <button onclick="edit(${iterator.id})" onclick = "editId(${iterator.id})">Ed</button>
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

loadPage(url)