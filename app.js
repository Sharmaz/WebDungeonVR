/* El mapa es una matriz, depende de el numero es el objeto que vamos a insertar */

var mapa = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 3, 0, 0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1, 1, 1, 1, 3, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [1, 3, 1, 0, 1, 2, 1, 3, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
]

var tamanoPared = 5
var altoPared = 4
var pasos = 0
var muro, premio
var muros = document.querySelector('#muros')
var premios = document.querySelector('#premios')
var hud = document.querySelector('#hud')
var mission = document.querySelector('#mission')
var win = document.querySelector('#win')
var keySound = document.querySelector('#keySound')
var stepSound = document.querySelector('#stepSound')
var sceneWASD = document.querySelector('a-scene')
var playerCam = document.querySelector('[camera]')

for (var x = 0; x < mapa.length; x++) {
    for (var y = 0; y < mapa[x].length; y++) {

        var posicion = (x - mapa.length/2) * tamanoPared + ' ' + 1.5 + ' ' + (y - mapa[x].length/2) * tamanoPared;

        if (mapa[x][y] == 0) {
            continue
        } 
        else if (mapa[x][y] == 1) {
            // Pared
            muro = document.createElement('a-box')
            muros.appendChild(muro)
            muro.setAttribute('color', '#fff')
            muro.setAttribute('material', 'src: #pared; repeat: 5 2.5;')
            muro.setAttribute('width', tamanoPared)
            muro.setAttribute('depth', tamanoPared)
            muro.setAttribute('height', altoPared)
            muro.setAttribute('position', posicion)
            muro.setAttribute('static-body', '')

        }
        else if (mapa[x][y] == 2 ) {
            // Jugador
            document.querySelector('#jugador').setAttribute('position', posicion)
        }
        else if (mapa[x][y] == 3 ) {
            // Premio
            premio = document.createElement('a-entity')
            premioAnimation = document.createElement('a-animation')
            premioCollada = document.createElement('a-collada-model')
            premioAll = document.querySelectorAll('premio')
            
            premios.appendChild(premio)
            premio.setAttribute('position', posicion)
            premio.setAttribute('class', 'premio')
            
            /* Por alguna razón los modelos 3D desaparecen en chrome al agregar a-animation */

            if (navigator.userAgent.search("Firefox") >= 0) {

              // Si estamos en Firefox agregamos animación

              premio.appendChild(premioAnimation)
            
              premioAnimation.setAttribute('attribute', 'rotation')
              premioAnimation.setAttribute('from', '0 -30 0')
              premioAnimation.setAttribute('to', '0 330 0')
              premioAnimation.setAttribute('dur', '8000')
              premioAnimation.setAttribute('easing', 'linear')
              premioAnimation.setAttribute('repeat', 'indefinite')
            } else {
              // Si estamos en cualquier otro navegador
              
              document.querySelector('#llave').addEventListener('loaded', function() {
                // Cuando el asset este cargado agregamos a el primer elemento Premio a-animation

                arregloPremios[0].appendChild(premioAnimation)
              
                premioAnimation.setAttribute('attribute', 'rotation')
                premioAnimation.setAttribute('from', '0 -30 0')
                premioAnimation.setAttribute('to', '0 330 0')
                premioAnimation.setAttribute('dur', '8000')
                premioAnimation.setAttribute('easing', 'linear')
                premioAnimation.setAttribute('repeat', 'indefinite')
              })
            }

            premio.appendChild(premioCollada)

            premioCollada.setAttribute('rotation', '0 -90 0')
            premioCollada.setAttribute('scale', '2 2 2')
            premioCollada.setAttribute('src', '#llave')


        }
    }
}

var arregloPremios = Array.from(document.querySelectorAll('.premio'))
var scoreToWin = 0

document.querySelector('a-scene').addEventListener('exit-vr', function () {
  // Escondemos o Mostramos al entrar y salir del modo VR algunos graficos
  
  hud.setAttribute('visible', 'false')
  mission.setAttribute('visible', 'false')
  win.setAttribute('visible', 'false')
  
  // Activar y Desactivar los controles WASD al entrar y salir en modo vr trae issues
  // sceneWASD.setAttribute('wasd-controls', 'enable: false')

  document.onkeydown = function(e) {
    // Fuera del modo vr denemos el sonido de los pasos si usamos WASD
    
    if (e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) {
          stepSound.components.sound.stopSound()
    }
  }
})

document.querySelector('a-scene').addEventListener('enter-vr',
  function () {
    // Activar y Desactivar los controles WASD al entrar y salir en modo vr trae issues
    //sceneWASD.removeAttribute('wasd-controls')

    // Escondemos o Mostramos al entrar y salir del modo VR algunos graficos
    
    hud.setAttribute('visible', 'true')
    mission.setAttribute('visible', 'true')

    setTimeout(function(){ mission.setAttribute('visible', 'false') }, 5000)

    // Evento click para recoger las llaves

    arregloPremios.forEach(function(premio) {
      premio.addEventListener('click', function() {
        premio.setAttribute('visible', 'false')
        scoreToWin++

        // Cada vez que recogemos una llave escucharemos un sonido

        keySound.components.sound.playSound()


        // Cambiamos el grafico del HUD para indicar cuantas llaves tenemos
        if (scoreToWin == 1) {
          hud.setAttribute('src', '#hud1')
        } else if (scoreToWin == 2) {
          hud.setAttribute('src', '#hud2')
        } else if (scoreToWin == 3) {
          hud.setAttribute('src', '#hud3')
        } else if (scoreToWin == 4) {
          hud.setAttribute('src', '#hud4')
        } else if (scoreToWin == 5) {
          hud.setAttribute('src', '#hud5')

          // Una vez recogemos todas las laves mostramos el grafico Win

          win.setAttribute('visible', 'true')
          setTimeout(function(){ 
            // 5 segundos despues de ganar salimos del modo vr
            document.querySelector('a-scene').exitVR()
            ;}, 5000)
          setTimeout(function(){
            // 6 segundos despues de salir de modo vr recargamos navegador
            window.location.href = '/WebDungeonVR';
            }, 6000)
        }
      })
    })

    // Reproducimos el sonido de paso cada vez que nos movemos con las teclas WASD

    document.onkeydown = function(e) {
      if (e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) {
          stepSound.components.sound.playSound()
      }
    }
})