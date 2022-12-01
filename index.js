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

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.post('/login', (req, res) => {
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
            req.session.id_estacionamento = isAuth.id_estacionamento
            res.redirect('/ativos')
        }
    }, 200);
})
app.get('/login', (req, res) => {
    if (req.session.login) {
        res.redirect('ativos/ativos')
    } else {
        res.render('login/login')
    }

})

app.get('/ativos', (req, res) => {
    if (req.session.login) {
        const id_estacionamento = req.session.id_estacionamento
        axios.get(`${urlAPI}ativos`, { params: { id_estacionamento } }).then(response => {
            let cars = response.data
            res.render('ativos/ativos', {
                values: cars
            })
        }).catch(e => console.log(e))

    } else {
        res.redirect('/login')
    }

})

app.post('/ativos', (req, res) => {
    const date = new Date().getTime()
    const insertCar = {
        id_estacionamento: req.session.id_estacionamento,
        marca: req.body.marca.toUpperCase(),
        modelo: req.body.modelo.toUpperCase(),
        cor: req.body.cor.toUpperCase(),
        placa: req.body.placa.toUpperCase(),
        tipo: req.body.timeType.toUpperCase(),
        tamanho: req.body.size.toUpperCase(),
        hora_entrada: date,
        finalizado: 0
    }
    axios.post(urlAPI, insertCar).then(res => console.log(res.data)).catch(e => console.log(e))
    res.redirect('/ativos')
})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})