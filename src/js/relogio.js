function relogio() {
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    if (hora <= 10) {
        hora = 0 + hora;
    }
    if (min < 10) {
        min = '0' + min;
    }

    document.querySelector("#horaAtual").textContent = (hora)
    document.querySelector("#minAtual").textContent = (min)
}

setInterval(relogio, 1000);