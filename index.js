const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const urlAPI = 'http://localhost:3000/'

const func = require('./func/user')

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
    let result
    let resultUser = func.verifyUser(email, password, urlAPI, result).then(res => {
        //console.log(res.data)
    })
    console.log(resultUser)


    // if (resUser == false) {
    //     res.render('login/login')
    // } else {
    //     req.session.login = email
    //     res.render('ativos/ativos')

    // }
})

app.get('/', (req, res) => {
    // if (req.session.login) {
    //     res.render('ativos/ativos')
    // } else {
    res.render('login/login')
    // }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})