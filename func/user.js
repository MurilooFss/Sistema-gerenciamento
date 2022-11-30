const axios = require('axios')


function verifyUser(email, senha, url, resultado) {
    resultado = axios.get(`${url}user`, { params: { email, senha } })
    resultado.then((result) => {
        resultado = result.data
    })
    return resultado
}

function subtract(x, y) {
    return x - y;
}
module.exports = { verifyUser, subtract }