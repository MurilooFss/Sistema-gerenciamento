window.onload = function(){
    var openModalAddCar = document.getElementById("openModalAddCar");
    var modalAddCar = document.getElementById("modalAddCar");
    var spanCloseModal = document.getElementsByClassName("close")[0];
    var cancelModalAddCar = document.getElementById("cancelModalAddCar");

    openModalAddCar.onclick = function(){
        modalAddCar.style.display = "block";
    }
    spanCloseModal.onclick = function(){
        modalAddCar.style.display = "none";
    }
    cancelModalAddCar.onclick = function(){
        modalAddCar.style.display = "none";
    }
    window.onclick = function(event){
        if(event.target == modalAddCar){
            modalAddCar.style.display = "none";
        }
    }
    window.onkeydown = function(event){
        if (event.key == 'Escape'){
            cancelModalAddCar.click();
        }
    }
};
function envia(){
    console.log('oi');
}

function relogio(){
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    if (hora <= 10){
        hora = 0 + hora;
    }
    if (min < 10){
        min = '0' + min;
    }

    document.querySelector("#horaAtual").textContent=(hora)
    document.querySelector("#minAtual").textContent=(min)
}

setInterval(relogio, 1000);



