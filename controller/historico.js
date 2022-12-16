const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

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

module.exports = { getHistory }