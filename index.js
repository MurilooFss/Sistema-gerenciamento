const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const urlAPI = 'http://localhost:3000/'
const axios = require('axios')

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
    console.log(password, email)
    async function x() {
        var res
        let value = await axios.get(`${urlAPI}user`, { params: { email, password } }).then((result) => {
            return result
        })
        res = value.data
        console.log(res)
    } x()

})

app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('ativos/ativos')
    } else {
        res.render('login/login')
    }

})


app.listen(port, () => {
    console.log('server iniciado na porta ', port)
})