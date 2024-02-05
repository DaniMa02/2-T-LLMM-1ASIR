

function cargarMapaAleatorio() {
  var map = document.getElementById("map");
  var ball = document.getElementById("ball");
  var spider = document.getElementById("spider");
  // Generar coordenadas para la bola y coordenadas aleatorias para la araña
  var ballX = 390;
  var ballY = 650;
  var spiderX = Math.floor(Math.random() * 700) ; // entre 25 y 775
  var spiderY = Math.floor(Math.random() * 700) ; // entre 25 y 775

  // Verificar que la araña esté a más de 350px de la bola
  while (Math.abs(spiderX - ballX) < 350 && Math.abs(spiderY - ballY) < 350) {
    spiderX = Math.floor(Math.random() * 700) ;
    spiderY = Math.floor(Math.random() * 700) ;
  }

  // Actualizar estilos CSS para la bola y la araña
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  spider.style.left = spiderX + "px";
  spider.style.top = spiderY + "px";


}


//LANZAMIENTO DE LA BOLA

  // Variables para capturar la posición del clic inicial y final
  let startX, startY, endX, endY;
  let posX = 390;
  let posY = 650;
  let intervalID;

function moverPelota() {

  // Evento mousedown para capturar la posición inicial del clic
  ball.addEventListener('mousedown', function(event) {
    startX = event.clientX;
    startY = event.clientY;
  });

  // Evento mouseup para capturar la posición final del clic
  map.addEventListener('mouseup', function(event) {
    endX = event.clientX;
    endY = event.clientY;

    // Cálculo de la dirección en función de la diferencia entre las posiciones
    let directionX = endX - startX;
    let directionY = endY - startY;

    // Lanzamiento de la pelota en la dirección calculada
    lanzarPelota(directionX, directionY,velocidad);
  });
}
var velocidad= 10

function lanzarPelota(directionX, directionY,velocidad) {
 
  // Calculamos las posiciones que irá tomando la bola y con las que se actualizará la posición de la misma.
  

  intervalID = setInterval(function() {
    posX += -directionX/velocidad;
    posY += -directionY/velocidad;

    // Actualizamos la posición de la pelota
    ball.style.left = posX + "px";
    ball.style.top = posY + "px";
    


    //DETECTAR COLISIONES

// Detectar colisión con los bordes del mapa
if (posX < 0 || posX > map.offsetWidth - ball.offsetWidth) {
  directionX = -directionX;
}

if (posY < 0 || posY > map.offsetHeight - ball.offsetHeight) {
  directionY = -directionY;
}


detectarColisionArana()
}
,10)
}
  

let puntos = 0;


function detectarColisionArana() {
  var score=document.getElementById("score");
  // Obtener las coordenadas del centro de la pelota y la araña
  let ballCenterX = posX + ball.offsetWidth / 2;
  let ballCenterY = posY + ball.offsetHeight / 2;
  let spiderCenterX = spider.offsetLeft + spider.offsetWidth / 2;
  let spiderCenterY = spider.offsetTop + spider.offsetHeight / 2;

  // Calcular la distancia entre el centro de la pelota y la araña
  let distanciaX = ballCenterX - spiderCenterX;
  let distanciaY = ballCenterY - spiderCenterY;
  let distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

  // Verificar si hay colisión comparando la distancia con el radio de colisión
  let radioColision = ball.offsetWidth / 2 + spider.offsetWidth / 2;
  if (distancia < radioColision) {
    // Colisión detectada entre la pelota y la araña
    // Incrementar el contador de puntos
    puntos += 1;
    score.textContent=puntos

    alert("Has ganado");
    
    velocidad=0
    clearTimeout(intervalID);
    reiniciarMapa();
  }
}

// Reiniciar el mapa
function reiniciarMapa() {
  // Eliminar todas las paredes del mapa
  let walls = document.getElementsByClassName("wall");
  while (walls.length > 0) {
    walls[0].remove();
  }
  posX=390
  posY=650
  ball.style.left = posX + "px";
  ball.style.top = posY + "px";
  // Cargar un nuevo mapa aleatorio
  cargarMapaAleatorio();
  velocidad=10
}
