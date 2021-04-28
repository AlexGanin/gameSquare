const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')

let counter = 0
const dataGame = $game.getBoundingClientRect()
const background = ['red', 'blue', 'green', 'yellow', 'gold']


function hide(el) {
  el.classList.add('hide')
}

function show(el) {
  el.classList.remove('hide')
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function seconds() {
  let timer = setInterval(function() {
    if($time.textContent > 0) {
      $time.textContent = ($time.textContent - 0.1).toFixed(1)
      return
    } 
    clearInterval(timer)
    finish()
  }, 100)
}

function start() {
  counter = 0
  hide($resultHeader)
  hide($start)
  show($timeHeader)
  setGameTime()
  $gameTime.setAttribute('disabled', true)
  $game.style.backgroundColor = '#fff'
  renderShare()
  seconds()
}

function setGameCounter() {
  $result.textContent = counter
}

function finish() {
  $gameTime.removeAttribute('disabled')
  $game.removeAttribute('style')
  $game.innerHTML = ''
  hide($timeHeader)
  setGameCounter()
  show($resultHeader)
  show($start)
}

function renderShare() {
  let randomColor = randomNum(0, background.length)
  $game.innerHTML = ''
  let squareSize = randomNum(10,100)
  let $square = document.createElement('div')
  const maxTop = dataGame.height - squareSize
  const maxLeft = dataGame.width - squareSize
  $square.style.backgroundColor = background[randomColor]
  $square.style.width = $square.style.height = squareSize + 'px'
  $square.style.cursor = 'pointer'
  $square.style.position = 'absolute'
  $square.style.top = randomNum(0, maxTop) + 'px'
  $square.style.left = randomNum(0, maxLeft) + 'px'
  $square.setAttribute('data-square', true)
  $game.insertAdjacentHTML('afterbegin', $square.outerHTML)
}

function shapeClicker(event) {
  if(event.target.dataset.square) {
    renderShare()
    counter++
  }
}

function setGameTime() {
  hide($resultHeader)
  show($timeHeader)
  $time.innerHTML = $gameTime.value
}

$game.addEventListener('click', shapeClicker)

$start.addEventListener('click', start)

$gameTime.addEventListener('input', setGameTime)