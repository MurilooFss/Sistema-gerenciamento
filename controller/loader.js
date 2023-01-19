
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')
async function loadData(req, res) {

    const id_estacionamento = req.session.id_estacionamento
    let values = await axios.get(`${urlAPI}ativos`, { params: { id_estacionamento } })
    data = values.data
    let cars = data.carros
    let vagas = data.vagas.vagas
    let vagasDisponiveis = vagas - (cars.length)
    req.session.vagasDisponiveis = vagasDisponiveis
    const r = {
        cars: cars,
        vagas: vagas,
        vagasDisponiveis: vagasDisponiveis,
        convenio: data.convenio
    }
    return r

}

module.exports = { loadData }