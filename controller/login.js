
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

function auth(req, res) {
    const email = req.body.email
    const password = req.body.password

    async function authUser(email, password, urlAPI) {
        let x = await axios.get(`${urlAPI}user`, { params: { email, password } })
            .then(r => {

                if (r.data == false) {
                    res.render('pages/login/login')
                }
                else {
                    req.session.login = email
                    req.session.id_estacionamento = r.data.id_estacionamento
                    res.redirect('/ativos')
                }
            })
        return x
    }
    authUser(email, password, urlAPI)
}

function getLoginPage(req, res) {
    if (req.session.login) {
        res.redirect('/ativos')
    } else {
        res.render('pages/login/login')
    }
}

module.exports = { auth, getLoginPage }