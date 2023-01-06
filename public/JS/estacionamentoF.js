document.querySelectorAll('#psera').forEach(function (b) {
    b.addEventListener('click', (e) => {
        document.querySelectorAll('input').forEach(i => {
            i.disabled = false

        })
        document.querySelectorAll('button').forEach(i => {
            i.disabled = false

        }
        )

    })
})


document.querySelectorAll('#serr2as').forEach(function (b) {
    b.addEventListener('click', (e) => {
        window.location.reload()
    })
})