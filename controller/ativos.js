const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

function getActiveCars(req, res) {

    (async () => {
        const id_estacionamento = req.session.id_estacionamento
        let data = await axios.get(`${urlAPI}ativos`, { params: { id_estacionamento } })
        let cars = data.data.carros
        let vagas = data.data.vagas.vagas
        var vagasDisponiveis = vagas - (cars.length)
        req.session.vagasDisponiveis = vagasDisponiveis
        for (const iterator of cars) {
            iterator.hora_entrada = converteHora(iterator.hora_entrada)
            function converteHora(horaInicial) {
                const dt = new Date(Number(horaInicial));
                let hr = dt.getHours();
                let m = dt.getMinutes();
                if (m < 10) {
                    m = '0' + m
                }
                if (hr < 10) {
                    hr = '0' + hr
                }

                return hr + ':' + m
            }
        }
        res.render('pages/ativos/ativos', {
            values: cars,
            vagas: vagasDisponiveis
        })

    })()

}

function registerCar(req, res) {

    const date = new Date().getTime()
    const action = req.body.act
    if (action == 0) {
        if (req.session.vagasDisponiveis > 0) {
            const insertCar = {
                id_estacionamento: req.session.id_estacionamento,
                marca: req.body.marca.toUpperCase(),
                modelo: req.body.modelo.toUpperCase(),
                cor: req.body.cor.toUpperCase(),
                placa: req.body.placa.toUpperCase(),
                tipo: req.body.timeType,
                tamanho: req.body.size,
                telefone: req.body.telefone,
                hora_entrada: date,
                finalizado: 0
            }
            axios.post(urlAPI, insertCar).then(r => {
                res.redirect('/ativos')
            }).catch(e => console.log(e))

        } else {
            res.redirect('/ativos')
        }
    }
    if (action == 1) {
        data = req.body
        const finishCar = {
            id_carro: data.idFinish,
            lavagem: data.lavagem,
            convenio: data.convenio,
            hInterna: data.hInterna,
            desconto: data.desconto,
            payType: data.payType
        }
        axios.put(`${urlAPI}ativos`, finishCar).then(r => {
            res.send({ valorFinal: r.data.valor_total })
        }).catch(e => console.log(e))
    }
    if (action == 2) {
        const exec = req.body.exec
        if (exec == 'edit') {
            console.log(exec)
            const updateCar = {
                id_carro: Number(req.body.idEdit),
                marca: req.body.marca.toUpperCase(),
                modelo: req.body.modelo.toUpperCase(),
                cor: req.body.cor.toUpperCase(),
                placa: req.body.placa.toUpperCase(),
                tipo: req.body.timeType,
                tamanho: req.body.size,
                telefone: req.body.telefone,
            }
            axios.put(urlAPI, updateCar).then((r) => res.redirect('/ativos'))
        } else {
            console.log(req.body.id_carro)
            axios.delete(`${urlAPI}`, { params: { id_carro: req.body.id_carro } })
                .then((response) => res.redirect('/ativos'))
                .catch((e) => (console.log(e)))

        }

    }
}

function getCar(req, res) {
    console.log(req.query.id_carro.idReq)
    const id_carro = req.query.id_carro.idReq
    console.log(id_carro)

    axios.get(`${urlAPI}ativos/search`, { params: { id_carro } })
        .then((r) => {
            console.log(r.data)
            res.send(r.data)
        })
}

function deleteCar(req, res) {

    const id_carro = req.query.id_carro
    console.log(id_carro)
    axios.delete(`${urlAPI}`, { params: { id_carro } }).then(res.send('removido'))


}

function calculeTime(req, res) {

    axios.put(`${urlAPI}ativos`, req.body).then((r) => res.json(r.data))


}
function finishTime(req, res) {

    const id_carro = req.body.id_carro
    console.log(id_carro)
    axios.put(`${urlAPI}ativos/finish`, { id_carro }).then((r) => {
        res.json('finalizado')
    })


}

module.exports = { getActiveCars, registerCar, getCar, deleteCar, calculeTime, finishTime }