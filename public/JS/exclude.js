function exclude(id_carro, urlApi, email, password) {
    (async () => {
        console.log(id_carro, urlApi, email, password)
        await axios.put(`${urlApi}historico/delete`, { id_carro, email, password }).then((r) => {
            if (r.data) {
                window.location.reload()
            }
        }).catch((e) => {
            if (e.response.status == 401) {
                window.alert('senha errada!!!!')
            }
        })
    })()
}