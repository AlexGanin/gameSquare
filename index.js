let counter = 0
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $gameTime = document.querySelector('#game-time')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
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
      $time.textContent = ($time.textContent - 0.100).toFixed(1)
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
  $time.innerHTML = $gameTime.value
  $gameTime.setAttribute('disabled', true)
  $game.style.backgroundColor = '#fff'
  renderShare()
  seconds()
}

function finish() {
  $gameTime.removeAttribute('disabled')
  $game.removeAttribute('style')
  $game.innerHTML = ''
  hide($timeHeader)
  $result.textContent = counter
  show($resultHeader)
  show($start)
}

function renderShare() {
  let squareSize = randomNum(10,100)
  let $square = document.createElement('div')
  $square.style.backgroundColor = background[randomNum(0, background.length)]
  $square.style.width = $square.style.height = squareSize + 'px'
  $square.style.cursor = 'pointer'
  $square.style.position = 'absolute'
  $square.style.top = randomNum(0, dataGame.height - squareSize) + 'px'
  $square.style.left = randomNum(0, dataGame.width - squareSize) + 'px'
  $square.setAttribute('data-square', true)
  $game.insertAdjacentHTML('afterbegin', $square.outerHTML)
}

function gameCounter() {
  $game.addEventListener('click', function(event) {
    if(event.target.dataset.square) {
      $game.innerHTML = ''
      renderShare()
      counter++
    }
  })
}

gameCounter()

$start.addEventListener('click', function() {
  start()
})

$gameTime.addEventListener('input', function(event) {

  hide($resultHeader)
  show($timeHeader)
  $time.textContent = this.value + '.0'

})