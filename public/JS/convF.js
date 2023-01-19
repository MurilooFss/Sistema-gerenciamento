function showForm() {
    let form = document.querySelector('.addConv')
    let btn = document.querySelector('.asdeew')
    form.style.display = 'block'
    btn.style.display = 'none'
    canc.addEventListener('click', (e) => {
        window.location.reload()
    })
}