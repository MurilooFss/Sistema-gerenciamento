function exclude(id_carro, urlApi) {
    (async () => {
        let x = await axios.delete(`${urlApi}ativos/delete`, { params: { id_carro } });
        location.reload()
    })()


}