const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const width = canvas.clientWidth
const height = canvas.clientHeight
const blockSize = 25
const backgroundColor = '#2B2B2B'
let intervalId

let snake
let foodCoordinates
function setup() {
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)
  snake = new Snake(
    blockSize*Math.floor(Math.random()*width/blockSize),
    blockSize*Math.floor(Math.random()*height/blockSize)
  )
  snake.init()

  foodCoordinates = spawnFood()
}

function update() {
  snake.update()
  
  // Check for food collision
  if (snake.x === foodCoordinates.x && snake.y === foodCoordinates.y) {
    console.log('Yummy <33')
    snake.grow()
    foodCoordinates = spawnFood()
  }
}

function start() {
  setup()
  intervalId = setInterval(update, 100)
}

function restart() {
  document.getElementById("status").innerHTML = ""
  kill()
  start()
}

function kill() {
  clearInterval(intervalId)
}

function spawnFood() {
  ctx.fillStyle = "#0CFF00"
  const x = blockSize*Math.floor(Math.random()*width/blockSize)
  const y = blockSize*Math.floor(Math.random()*height/blockSize)
  ctx.fillRect(x, y, blockSize,  blockSize)
  return { x, y }
}

window.onkeypress = (e) => {
  if (e.code === "KeyW") {
    snake.setDir(0, -1)
  } else if (e.code === "KeyA") {
    snake.setDir(-1, 0)
  } else if (e.code === "KeyS") {
    snake.setDir(0, 1)
  } else if (e.code === "KeyD") {
    snake.setDir(1, 0)
  }
}

document.getElementById("restartButton").onclick = restart

start()

