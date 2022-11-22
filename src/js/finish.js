const url2 = ('http://localhost:3000')

function finish(id) {
    let modalFinishTime = document.getElementById("modalFinishTime");
    modalFinishTime.style.display = "block";
    axios.get(`url2/${id}`)
        .then((response) => {
            console.log(response)
        })
        .catch((e) => console.error(e))
}