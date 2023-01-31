const urlAPI = 'http://localhost:5500/'

document.querySelectorAll('#psera').forEach(function (b) {
    b.addEventListener('click', (e) => {
        modalAdmin.style.display = 'block'
        let aut = document.querySelector('.pseroiia')
        aut.addEventListener('click', () => {
            let email = document.getElementById('email').value;
            let password = document.getElementById('pwd').value;
            (async () => {
                let isAdmin = await axios.get(`${urlAPI}login/previlege`, { params: { email, password } })
                if (isAdmin.data == true) {
                    document.querySelectorAll('input').forEach(i => {
                        i.disabled = false

                    })
                    document.querySelectorAll('button').forEach(i => {
                        i.disabled = false
                        i.style.display = 'inline-block'

                    })
                    modalAdmin.style.display = 'none'
                    psera.style.display = 'none'
                } else {
                    window.alert('Suas credenciais falharam!')
                }

            })()


        })




    })
})

cancelModalAdmin.addEventListener('click', () => {
    fechaModal()

})
function fechaModal() {
    location.reload()
}
document.querySelectorAll('#serr2as').forEach(function (b) {
    b.addEventListener('click', (e) => {
        window.location.reload()
    })
})

var coll = document.getElementsByClassName("item");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
