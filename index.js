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
        res.redirect('/ativos')
    } else {
        res.render('login/login')
    }

})

app.get('/ativos', (req, res) => {
    if (req.session.login) {
        (async () => {
            const id_estacionamento = req.session.id_estacionamento
            let data = await axios.get(`${urlAPI}ativos`, { params: { id_estacionamento } })
            let cars = data.data.carros
            let vagas = data.data.vagas.vagas
            console.log(vagas)
            let vagasDisponiveis = vagas - (cars.length)
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
            res.render('ativos/ativos', {
                values: cars,
                vagas: vagasDisponiveis
            })

        })()
    } else {
        res.redirect('/login')
    }

})

app.post('/ativos', (req, res) => {
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
                console.log(r.data)
                res.redirect('/ativos')
            }).catch(e => console.log(e))

        } else {
            res.redirect('/ativos')
        }
    }
    if (action == 2) {
        const updateCar = {
            marca: req.body.marca.toUpperCase(),
            modelo: req.body.modelo.toUpperCase(),
            cor: req.body.cor.toUpperCase(),
            placa: req.body.placa.toUpperCase(),
            tipo: req.body.timeType,
            tamanho: req.body.size,
            telefone: req.body.telefone,
        }
    }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})