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
            //Pared
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
            //Jugador
            document.querySelector('#jugador').setAttribute('position', posicion)
        }
        else if (mapa[x][y] == 3 ) {
            //Premio
            premio = document.createElement('a-entity')
            premioAnimation = document.createElement('a-animation')
            premios.appendChild(premio)
            premio.setAttribute('position', posicion)
            premio.setAttribute('class', 'premio')
            premio.setAttribute('collada-model', '#llave')
            premio.setAttribute('scale', '2 2 2')
            premio.appendChild(premioAnimation)
            
            premioAnimation.setAttribute('attribute', 'rotation')
            premioAnimation.setAttribute('from', '0 -30 0')
            premioAnimation.setAttribute('to', '0 330 0')
            premioAnimation.setAttribute('dur', '8000')
            premioAnimation.setAttribute('easing', 'linear')
            premioAnimation.setAttribute('repeat', 'indefinite')
        }
    }
}
var arregloPremios = Array.from(document.querySelectorAll('.premio'))
var scoreToWin = 0

document.querySelector('a-scene').addEventListener('exit-vr', function () {
  hud.setAttribute('visible', 'false')
  mission.setAttribute('visible', 'false')
  win.setAttribute('visible', 'false')
  //sceneWASD.setAttribute('wasd-controls', 'enable: false')

  document.onkeydown = function(e) {
      if (e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) {
          stepSound.components.sound.stopSound()
      }
    }
})
  

document.querySelector('a-scene').addEventListener('enter-vr',
  function () {

    //sceneWASD.removeAttribute('wasd-controls')
    hud.setAttribute('visible', 'true')
    mission.setAttribute('visible', 'true')

    setTimeout(function(){ mission.setAttribute('visible', 'false') }, 5000)

    arregloPremios.forEach(function(premio) {
      premio.addEventListener('click', function() {
        premio.setAttribute('visible', 'false')
        scoreToWin++
        keySound.components.sound.playSound()

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

          win.setAttribute('visible', 'true')
          setTimeout(function(){ document.querySelector('a-scene').exitVR()
            ;}, 5000)
          setTimeout(function(){ 
            window.location.href = '/';
            }, 6000)
        }
      })
    })
    document.onkeydown = function(e) {
      if (e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) {
          stepSound.components.sound.playSound()
      }
    }
})