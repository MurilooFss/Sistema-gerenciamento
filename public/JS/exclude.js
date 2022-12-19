function exclude(id_carro, urlApi) {
    (async () => {
        console.log(id_carro)
        let x = await axios.delete(`${urlApi}ativos/delete`, { params: { id_carro } });
        location.reload()
    })()


}