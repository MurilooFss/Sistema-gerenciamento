const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

function parkingDetails(req, res) {
    if (req.session.login) {
        (async () => {
            const id_estacionamento = req.session.id_estacionamento
            let data = await axios.get(`${urlAPI}ativos`, { params: { id_estacionamento } })
            let cars = data.data.carros
            let vagas = data.data.vagas.vagas
            var vagasDisponiveis = vagas - (cars.length)
            req.session.vagasDisponiveis = vagasDisponiveis

            let estacionamento = await axios.get(`${urlAPI}estacionamento`, { params: { id_estacionamento } })
            let eData = estacionamento.data
            res.render('pages/estacionamento/estacionamento', {
                vagasTotais: vagas,
                vagas: vagasDisponiveis,
                hora1_carro_p: eData.hora1_carro_p,
                hora2_carro_p: eData.hora2_carro_p,
                hora3_carro_p: eData.hora3_carro_p,
                hora4_carro_p: eData.hora4_carro_p,
                valor_lava_rapido: eData.valor_lava_rapido,
                hora1_carro_g: eData.hora1_carro_g,
                hora2_carro_g: eData.hora2_carro_g,
                hora3_carro_g: eData.hora3_carro_g,
                hora4_carro_g: eData.hora4_carro_g,
                hora1_moto: eData.hora1_moto,
                hora2_moto: eData.hora2_moto,
                hora3_moto: eData.hora3_moto,
                hora4_moto: eData.hora4_moto,
                valor_higi_interna: eData.valor_higi_interna
            })

        })()
    } else {
        res.redirect('/login')
    }

}

module.exports = { parkingDetails }