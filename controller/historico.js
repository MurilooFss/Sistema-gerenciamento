const urlAPI = 'http://localhost:3000/'
const axios = require('axios')
const { verifyPrevilege } = require('./login')

function getHistory(req, res) {
    if (req.session.login) {
        (async () => {
            const id_estacionamento = req.session.id_estacionamento
            let cars = await axios.get(`${urlAPI}historico`, { params: { id_estacionamento } })
            function converteHora(hora) {
                const dt = new Date(Number(hora));
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
            for (const iterator of cars.data) {
                iterator.hora_entrada = converteHora(iterator.hora_entrada)
            }
            for (const iterator of cars.data) {
                iterator.hora_saida = converteHora(iterator.hora_saida)
            }

            res.render('pages/historico/historico', {
                values: cars.data,
                vagas: req.session.vagasDisponiveis
            })
        })()

    } else {
        res.redirect('/login')
    }
}

function getDetails(req, res) {
    const id_carro = req.query.id_carro
    axios.get(`${urlAPI}historico/detalhes`, { params: { id_carro } }).then((r) => {
        res.send(r.data)
    })
}

function reOpen(req, res) {
    (async () => {
        const id_carro = req.body.id_carro
        const email = req.body.email
        const password = req.body.password
        const previlege = await verifyPrevilege(email, password)
        if (previlege) {
            axios.put(`${urlAPI}historico/detalhes`, { id_carro }).then(res.json('reaberto'))
        } else {
            res.sendStatus(401)
        }
    })()
}
function deleteCarHistory(req, res) {
    (async () => {

        const id_carro = req.body.id_carro
        const email = req.body.email
        const password = req.body.password

        const previlege = await verifyPrevilege(email, password)
        if (previlege) {
            axios.delete(`${urlAPI}`, { params: { id_carro } }).then(res.send('removido'))
        } else {
            res.sendStatus(401)
        }
    })()

}

module.exports = { getHistory, getDetails, reOpen, deleteCarHistory }