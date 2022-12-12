const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')
const abreConfirma2 = require('./public/JS/remove')



const port = 5500
var path = require('path')
const { redirect } = require('express/lib/response')
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
            .then(r => {
                isAuth = r.data
                if (isAuth == false) {
                    res.render('login/login')
                }
                else {
                    req.session.login = email
                    req.session.id_estacionamento = isAuth.id_estacionamento
                    res.redirect('/ativos')
                }
            })
        return x
    }
    authUser(email, password, urlAPI)
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
    if (req.session.login) {
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
                    res.redirect('/ativos')
                }).catch(e => console.log(e))

            } else {
                res.redirect('/ativos')
            }
        }
        if (action == 1) {
            data = req.body
            const finishCar = {
                id_carro: data.idFinish,
                lavagem: data.lavagem,
                convenio: data.convenio,
                hInterna: data.hInterna,
                desconto: data.desconto,
                payType: data.payType
            }
            axios.put(`${urlAPI}ativos`, finishCar).then(r => {
                res.send({ valorFinal: r.data.valor_total })
            }).catch(e => console.log(e))
        }
        if (action == 2) {
            const exec = req.body.exec
            if (exec == 'edit') {
                console.log(exec)
                const updateCar = {
                    id_carro: Number(req.body.idEdit),
                    marca: req.body.marca.toUpperCase(),
                    modelo: req.body.modelo.toUpperCase(),
                    cor: req.body.cor.toUpperCase(),
                    placa: req.body.placa.toUpperCase(),
                    tipo: req.body.timeType,
                    tamanho: req.body.size,
                    telefone: req.body.telefone,
                }
                axios.put(urlAPI, updateCar).then((r) => res.redirect('/ativos'))
            } else {
                console.log(req.body.id_carro)
                axios.delete(`${urlAPI}`, { params: { id_carro: req.body.id_carro } })
                    .then((response) => res.redirect('/ativos'))
                    .catch((e) => (console.log(e)))

            }

        }
    } else {
        res.redirect('/login')
    }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})