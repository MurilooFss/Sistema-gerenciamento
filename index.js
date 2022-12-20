const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')
const cors = require('cors')


const hist = require('./controller/historico')
const ativos = require('./controller/ativos')
const login = require('./controller/login')




const port = 5500
var path = require('path')
const app = express()

app.use(session({ secret: 'vmaunhgoqakfd321nmfdsre132' }))
app.use(cors())
app.use(express.json())

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {

    if (req.url == '/login') {
        console.log('login')
        next()
    } else {
        if (req.session.login == undefined) {

            res.redirect('/login')
        } else {

            next()
        }

    }

})

app.route('/').get((req, res) => {
    res.redirect('/login')
})

app.route('/login').post(login.auth)

app.route('/login').get(login.getLoginPage)




app.route('/ativos').get(ativos.getActiveCars)

app.route('/ativos').post(ativos.registerCar)

app.route('/ativos/search').get(ativos.getCar)

app.route('/ativos/delete').delete(ativos.deleteCar)

app.route('/ativos').put(ativos.calculeTime)
app.route('/ativos/finish').put(ativos.finishTime)



app.route('/historico').get(hist.getHistory)
app.route('/historico/detalhes').get(hist.getDetails)
app.route('/historico/detalhes').put(hist.reOpen)







app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})