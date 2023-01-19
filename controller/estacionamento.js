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

function updateData(req, res) {
    if (req.session.login) {

        const data = req.body
        const values = {
            id_estacionamento: req.session.id_estacionamento,
            vagas: data.vagas,
            hora1_carro_p: data.hora1_p,
            hora2_carro_p: data.hora2_p,
            hora3_carro_p: data.hora3_p,
            hora4_carro_p: data.hora4_p,
            hora1_carro_g: data.hora1_g,
            hora2_carro_g: data.hora2_g,
            hora3_carro_g: data.hora3_g,
            hora4_carro_g: data.hora4_g,
            hora1_moto: data.hora1_moto,
            hora2_moto: data.hora2_moto,
            hora3_moto: data.hora3_moto,
            hora4_moto: data.hora4_moto
        }
        axios.put(`${urlAPI}estacionamento`, values).then(r => {
            res.redirect('/estacionamento')
        }).catch(e => {
            console.log(e)
        })
    } else {
        res.redirect('/login')
    }

}

module.exports = { parkingDetails, updateData }