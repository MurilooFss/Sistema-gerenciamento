function excluir(id) {
    axios.delete(`${url}`, { params: { id_carro: id.value } })
        .then((response) => location.reload())
        .catch((e) => (console.log(e)))
}
function abreConfirma(id) {
    idConfirma.value = id.value
    modalConfirma.style.display = "block";
}