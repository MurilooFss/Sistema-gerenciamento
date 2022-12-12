function abreConfirma() {
    modalConfirma.style.display = "block";
}
function abreConfirma2(data) {
    console.log(data)
    modalConfirma2.style.display = "block";
    idCarSpanFinishModal.innerText = data.id_carro
    marcaSpanFinishModal.innerText = data.marca
    modeloSpanFinishModal.innerText = data.modelo
    placaSpanFinishModal.innerText = data.placa
    horaEntradaSpanFinishModal.innerText = converteHora(data.hora_entrada)
    horaSaidaSpanFinishModal.innerText = converteHora(data.hora_saida)
    adicionaisSpanFinishModal.innerText = data.lava_rapido + '+' + data.higi_interna
    convenioSpanFinishModal.innerText = data.id_convenio
    tempoTotalSpanFinishModal.innerText = data.tempo_total + "h"
    valorTotalSpanFinishModal.innerText = 'R$' + data.valor_total
}


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