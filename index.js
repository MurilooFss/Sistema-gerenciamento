const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')


const port = 5500
var path = require('path')
const app = express()

app.use(session({ secret: 'vmaunhgoqakfd321nmfdsre132' }))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    var isAuth
    async function authUser(email, password, urlAPI) {
        let x = await axios.get(`${urlAPI}user`, { params: { email, password } })
            .then(res => {
                return isAuth = res.data
            })
        return x
    }
    authUser(email, password, urlAPI)
    //timeout difined because the promise needed to be loaded.
    setTimeout(() => {
        if (isAuth == false) {
            console.log('usuário inválido')
            res.render('login/login')
        }
        else {
            console.log('válido')
            req.session.login = email
            res.render('ativos/ativos')
        }
    }, 200);
})

app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('ativos/ativos')
        console.log('o usuário logado é o ' + req.session.login)
    } else {
        res.render('login/login')
    }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})