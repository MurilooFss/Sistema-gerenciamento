document.querySelectorAll('#psera').forEach(function (b) {
    b.addEventListener('click', (e) => {
        document.querySelectorAll('input').forEach(i => {
            i.disabled = false

        })
        document.querySelectorAll('button').forEach(i => {
            i.disabled = false
            i.style.display = 'inline-block'

        }

        )
        psera.style.display = 'none'

    })
})


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
