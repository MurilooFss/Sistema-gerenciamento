function excluir(id) {
    console.log(id, id.value)
    axios.delete(`${url}${id.value}`)
        .then((response) => console.log(location.reload()))
        .catch((e) => (console.log(e)))
}
function abreConfirma(id) {
    idConfirma.value = id.value
    modalConfirma.style.display = "block";
}