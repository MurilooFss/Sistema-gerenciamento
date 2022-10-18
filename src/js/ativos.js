window.onload = function(){
    var openModalAddCar = document.getElementById("openModalAddCar");
    var modalAddCar = document.getElementById("modalAddCar");
    var spanCloseModal = document.getElementsByClassName("close")[0];
    var cancelModalAddCar = document.getElementById("cancelModalAddCar");
    var openModalFinish = document.getElementById("openModalFinish");
    var modalFinishTime = document.getElementById("modalFinishTime");
    var spanCloseModalFinish = document.getElementsByClassName("close")[1];
    var cancelModalFinshTime = document.getElementById("cancelModalFinshTime");

    openModalAddCar.onclick = function(){
        modalAddCar.style.display = "block";
    }
    spanCloseModal.onclick = function(){
        modalAddCar.style.display = "none";
    }
    cancelModalAddCar.onclick = function(){
        modalAddCar.style.display = "none";
    }
    openModalFinish.onclick = function(){
        modalFinishTime.style.display = "block";
    }
    spanCloseModalFinish.onclick = function(){
        modalFinishTime.style.display = "none";
    }
    cancelModalFinshTime.onclick = function(){
        modalFinishTime.style.display = "none";
    }
    window.onclick = function(event){
        if(event.target == modalAddCar){
            modalAddCar.style.display = "none";
        }
        if(event.target == modalFinishTime){
            modalFinishTime.style.display = "none";
        }
    }
    window.onkeydown = function(event){
        if (event.key == 'Escape'){
            cancelModalAddCar.click();
            cancelModalFinshTime.click();
        }
    }
};
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



