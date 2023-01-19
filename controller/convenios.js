const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

function getConv(req, res) {
    if (req.session.login) {
        (async () => {
            const id_estacionamento = req.session.id_estacionamento
            const r = await axios.get(`${urlAPI}convenio`, { params: { id_estacionamento } })
            res.render('pages/convenios/convenios', {
                vagas: req.session.vagasDisponiveis,
                values: r.data
            })
        })()


    } else {
        res.redirect('/login')
    }
}
function addConv(req, res) {
    if (req.session.login) {
        (async () => {
            const id_estacionamento = req.session.id_estacionamento
            const data = req.body
            const newConv = {
                id_estacionamento: id_estacionamento,
                empresa_convenio: data.empresa_convenio,
                desconto: (data.desconto) / 100
            }
            await axios.post(`${urlAPI}convenio`, newConv)
            res.redirect('/convenios')
        })()


    } else {
        res.redirect('/login')
    }
}



module.exports = { getConv, addConv }