function Character (pnjParams, x, y, id) {
    this.x = x
    this.y = y
    this.left = false
    this.right = false
    this.isJumping = false
    this.attack = false
    this.id = id
    this.speed = 0
    this.steps = []
    this.character = null
    this.character = document.createElement("div")
    this.character.id = `${this.id}-character`
    this.verticalVelocity = 0
    this.lastDirection = 1

    this.translation = pnjParams.translation
    this.width = pnjParams.width
    this.height = pnjParams.height
    this.size = pnjParams.size
    this.animSpeed = pnjParams.animSpeed
    this.sprites = pnjParams
    this.stamina = pnjParams.stamina
    this.maxSpeed = pnjParams.vMax
    this.weight = pnjParams.weight

    this.name = `player_${id}`


    this.spawn = function () {
        this.character.style.position = "absolute"
        this.character.style.top = this.y + "px"
        this.character.style.left = this.x + "px"
        this.character.style.height = `${this.height}px`
        this.character.style.width = `${this.width}px`
        this.character.style.zIndex = 2
        this.character.style.transform = `scale(3)`
        // this.character.style.border = "thick solid yellow";

        let run = []
        for (let i = 0; i < this.sprites.run.length;  i++) {
            let sprite = document.createElement("div")
            sprite.style.backgroundImage = "url('" + this.sprites.run[i] + "')"
            sprite.style.height = `${this.height}px`
            sprite.style.width = `${this.width}px`
            sprite.style.position= "absolute"
            sprite.style.backgroundSize = `${this.size}px`
            sprite.style.backgroundRepeat = "no-repeat"
            sprite.style.translate = `${this.translation}%`

            run.push(sprite)
            this.character.appendChild(sprite)
        }

        let idle = []
        for (let i = 0; i < this.sprites.idle.length;  i++) {
            let sprite = document.createElement("div")
            sprite.style.backgroundImage = "url('" + this.sprites.idle[i] + "')"
            sprite.style.height = `${this.height}px`
            sprite.style.width = `${this.width}px`
            sprite.style.position= "absolute"
            sprite.style.backgroundSize = `${this.size}px`
            sprite.style.backgroundRepeat = "no-repeat"
            sprite.style.translate = `${this.translation}%`

            idle.push(sprite)
            this.character.appendChild(sprite)
        }
        let attack = []

        for (let i = 0; i < this.sprites.attack.length;  i++) {
            let sprite = document.createElement("div")
            sprite.style.backgroundImage = "url('" + this.sprites.attack[i] + "')"
            sprite.style.height = `${this.height}px`
            sprite.style.width = `${this.width}px`
            sprite.style.position= "absolute"
            sprite.style.backgroundSize = `${this.size}px`
            sprite.style.backgroundRepeat = "no-repeat"
            sprite.style.translate = `${this.translation}%`

            attack.push(sprite)
            this.character.appendChild(sprite)
        }

        this.steps.push(run)
        this.steps.push(idle)
        this.steps.push(attack)

        return this
    }

    this.animate = function (frame) {

        let direction = this.lastDirection

        if (Math.sign(this.speed) === 0 ) {
            direction = this.lastDirection
        } else {
            direction = Math.sign(this.speed)
            this.lastDirection = direction
        }

        for (let j = 0; j < this.steps.length; j++) {
            for (let i = 0; i < this.steps[j].length; i++) {
                this.steps[j][i].style.visibility = "hidden"
                this.steps[j][i].style.transform = `scaleX(${direction}) translate(${this.translation}, 0)`
            }
        }

        if (this.attack) {
            let x = Math.floor(frame % (this.steps[2].length * this.animSpeed) / this.animSpeed)
            this.steps[2][x].style.visibility = "visible"
        } else {
            if (this.speed === 0) {
                let x = Math.floor(frame % (this.steps[1].length * this.animSpeed) / this.animSpeed)
                this.steps[1][x].style.visibility = "visible"
            } else {
                let x = Math.floor(frame % (this.steps[0].length * this.animSpeed) / this.animSpeed)
                this.steps[0][x].style.visibility = "visible"
            }
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
            this.verticalVelocity -= this.stamina
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

        this.infoNode = document.createElement("div")
        this.infoNode.id = `${this.id}-character-info`
        this.infoNode.style.top = "-5px"
        this.infoNode.style.left = "20px"
        this.infoNode.style.position = "absolute"
        this.infoNode.style.zIndex = 1
        this.infoNode.style.color = "white"
        this.infoNode.style.fontSize= "5px"
        this.infoNode.innerText = `${this.id}`
        this.character.appendChild(this.infoNode)
    }
}

