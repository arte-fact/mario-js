function Character (sprites, x, y, stamina, weight, maxSpeed, width, height, id, animSpeed) {
    this.x = x
    this.y = y
    this.id = id
    this.stamina = stamina
    this.maxSpeed = maxSpeed
    this.sprites = sprites
    this.speed = 0
    this.steps = []
    this.left = false
    this.right = false
    this.isJumping = false
    this.character = null
    this.weight = weight
    this.character = document.createElement("div")
    this.character.id = `${this.id}-character`
    this.verticalVelocity = 0
    this.width = width
    this.height = height

    this.infoNode = document.createElement("div")
    this.infoNode.id = `${this.id}-character-info`
    this.infoNode.style.top = "-50px"
    this.infoNode.style.position = "absolute"
    this.infoNode.style.zIndex = 1
    this.infoNode.style.color = "white"
    this.infoNode.style.fontSize= "10px"
    this.character.appendChild(this.infoNode)
    this.animSpeed = animSpeed


    this.spawn = function () {
        this.character.style.position = "absolute"
        this.character.style.top = this.y + "px"
        this.character.style.left = this.x + "px"
        this.character.style.height = `${this.height}px`
        this.character.style.width = `${this.width}px`
        this.character.style.zIndex = 2

        for (let i = 0; i < this.sprites.length;  i++) {
            let sprite = document.createElement("div")
            sprite.style.backgroundImage = "url('" + this.sprites[i] + "')"
            sprite.style.height = `${this.height}px`
            sprite.style.width = `${this.width}px`
            sprite.style.position= "absolute"
            sprite.style.backgroundSize = `${this.width}px`

            this.steps.push(sprite)
            this.character.appendChild(sprite)
        }
        return this
    }

    this.animate = function (frame) {
        let direction = Math.sign(this.speed)
        if (direction === 0) { direction = 1 }

        for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].style.visibility = "hidden"
            this.steps[i].style.transform = `scaleX(${direction})`
        }

        if (this.speed === 0) {
            this.steps[0].style.visibility = "visible"
        } else {
            let x = Math.floor(frame % (this.steps.length * this.animSpeed) / this.animSpeed)
            this.steps[x].style.visibility = "visible"
        }
    }

    this.run = function () {
        this.character.style.top = this.y + "px"
        this.character.style.left = this.x + "px"
    }

    this.direction = function () {
        if (this.left === false && this.right === false) {
            if (this.speed > 0) {
                this.speed -= this.weight
            }
            if (this.speed < 0) {
                this.speed += this.weight
            }
        }

        if (this.left === true) {
            if (this.speed > -1 * this.maxSpeed) {
                this.speed-= this.stamina
            }
        }

        if (this.right === true) {
            if (this.speed < this.maxSpeed) {
                this.speed+= this.stamina
            }
        }
    }

    this.move = function () {
        if (this.collideLeft() && this.speed < 0) {
            this.x += 0 + this.speed
            this.character.style.left = this.x + "px"
        }
        if (this.collideRight() && this.speed > 0) {
            this.x += 0 + this.speed
            this.character.style.left = this.x + "px"
        }
    }

    this.operateGravity = function (altitude) {
        if (this.isJumping === true && this.collideDown(altitude)) {
            this.verticalVelocity -= this.stamina * 2
        } else if (this.collideDown(altitude)) {
            this.verticalVelocity = 0
        } else {
            this.verticalVelocity += this.weight
        }

        this.y += this.verticalVelocity
        this.character.style.top = this.y + "px"
    }

    this.collideLeft = function () {
        return this.character.offsetLeft > 100
    }

    this.collideRight = function () {
        return this.character.offsetLeft < 2900
    }

    this.collideDown = function (altitude) {
        if (this.y >= altitude - this.height) {
            this.y = altitude - this.height
            return true
        }
        return false
    }

    this.printCharacter = function (container) {
        container.appendChild(this.character)
    }

    this.debug = function () {
        document.getElementById(`${this.id}-character-info`).innerText = `id: ${this.id} x: ${this.x}, y: ${this.y}, Xspeed: ${this.speed}, Yspeed: ${this.verticalVelocity}`
    }
}

