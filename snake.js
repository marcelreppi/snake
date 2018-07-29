function Snake(x, y) {
  this.xDir = 1
  this.yDir = 0

  this.xSpeed = blockSize
  this.ySpeed = blockSize

  this.x = x
  this.y = y

  this.color = "#FFFFFF"

  this.bodyParts = [ { x, y } ]

  this.init = function() {
    this.drawHead()
  }

  this.drawHead = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, blockSize, blockSize)
  }

  this.removeTail = function() {
    const tail = this.bodyParts[0]
    ctx.fillStyle = backgroundColor
    ctx.fillRect(tail.x, tail.y, blockSize, blockSize)
  }

  this.setDir = function(xDir, yDir) {
    this.xDir = xDir
    this.yDir = yDir
  }

  this.isOutOfBounds = function() {
    return this.x < 0 || this.x > width-blockSize || this.y < 0 || this.y > height-blockSize
  }

  this.hitYourself = function() {
    return this.bodyParts
      .slice(0, this.bodyParts.length-1)
      .some( p => p.x === this.x && p.y === this.y )
  }

  this.update = function() {
    for (let i = 0, len = this.bodyParts.length; i < len; i++) {
      const part = this.bodyParts[i]
      
      if (i === 0) {
        // Tail element
        this.removeTail()
      }

      if (i === len-1) {
        // Head element
        this.x += this.xDir * this.xSpeed
        this.y += this.yDir * this.ySpeed
        part.x = this.x
        part.y = this.y
        this.drawHead()
        continue
      }

      part.x = this.bodyParts[i+1].x
      part.y = this.bodyParts[i+1].y
    }
    

    if (this.isOutOfBounds() || this.hitYourself()) {
      document.getElementById("status").innerHTML = "You lost!"
      kill()
    }
  }

  this.grow = function() {
    this.x += this.xDir * this.xSpeed
    this.y += this.yDir * this.ySpeed
    this.bodyParts.push({ x: this.x, y: this.y })
    document.getElementById("length").innerHTML = this.bodyParts.length
    this.drawHead()
  }
}