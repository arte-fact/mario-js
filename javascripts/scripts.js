window.onload = function () {
    let playerCharacter = document.getElementById('character')
    let container = document.getElementById("container")
    let mario1 = document.getElementById('mario1')
    let mario2 = document.getElementById('mario2')
    let mario3  = document.getElementById('mario3')
    let x = 200
    let y = 200
    let state = 1
    let speed = 0
    let maxSpeed = 20
    let gravity = 20
    let acceleration = 1
    let desceleration = 1
    let jumpHeight = 200

    let altitude = 400
    let stageSize = 3000

    mario1.style.visibility = "visible"
    mario2.style.visibility = "hidden"
    mario3.style.visibility = "hidden"

    playerCharacter.style.position = "absolute"
    playerCharacter.style.top = x + "px"
    playerCharacter.style.left = y + "px"

    let isJumpEnded = false
    let left = false
    let right = false
    let spaceBar = false

    generateWorld(altitude, container, stageSize)
    play()

    window.addEventListener("keypress", function (event) {
        switch (event.key) {
            case " ": spaceBar = true
                break
            case "d": right = true
                break
            case "q": left = true
                break
        }
    });

    window.addEventListener("keyup", function onKeyUp(event) {
        switch (event.key) {
            case " ": spaceBar = false
                break
            case "d": right = false
                break
            case "q": left = false
                break
        }
    });

    function play() {
        setInterval(function () {

            let playerRelativeX = playerCharacter.offsetLeft - container.scrollLeft

            holdDirection()
            makeMove()
            animateCharacter()
            makeJump()
            makeGravity()
            autoScroll(playerRelativeX)

        }, 16)

        setInterval(function () {
            if (state === 0) {
                state++
            } else {
                state--
            }
        }, speed * 50)
    }

    function holdDirection() {
        if (left === false && right === false) {
            if (speed > 0) {
                speed -= desceleration
            }
            if (speed < 0) {
                speed += desceleration
            }
        }

        if (left === true) {
            if (speed > -1 * maxSpeed) {
                speed -= acceleration
            }
        }

        if (right === true) {
            if (speed < maxSpeed) {
                speed += acceleration
            }
        }
    }

    function makeJump() {
        if (spaceBar === true) {
            if (y > altitude - jumpHeight && isJumpEnded === false) {
                y -= gravity
                playerCharacter.style.top = y + "px"
            } else {
                isJumpEnded = true
                if (y < altitude) {
                    y += gravity
                    playerCharacter.style.top = y + "px"
                }
            }
        } else {
            isJumpEnded = false
        }
    }
    function makeMove() {
        if (leftCollision() && speed < 0) {
            x += speed
            playerCharacter.style.left = x + "px"
        }
        if (rightCollision() && speed > 0) {
            x += speed
            playerCharacter.style.left = x + "px"
        }
    }

    function makeGravity() {
        if (y < altitude && spaceBar === false) {
            y += gravity
            playerCharacter.style.top = y + "px"
        }
    }

    function autoScroll(playerRelativeX) {
        if (playerRelativeX > 400) {
            container.scrollLeft += Math.ceil(Math.abs(speed))
        }

        if (playerRelativeX < 200) {
            container.scrollLeft -= Math.ceil(Math.abs(speed))
        }
    }

    function generateWorld() {
        let ground = document.createElement("div")
        ground.classList.add("ground")
        ground.style.position = "relative"
        ground.style.top = altitude + 48 + "px"
        ground.style.backgroundImage = "url('static/ground.png')"
        ground.style.backgroundSize = "50px"
        ground.style.height= (600 - altitude) + "px"
        ground.style.width = stageSize + "px"

        container.appendChild(ground)
    }

    function leftCollision() {
        return playerCharacter.offsetLeft > 100
    }

    function rightCollision() {
        return playerCharacter.offsetLeft < (stageSize - 200)
    }

    function animateCharacter() {
        if (speed !== 0) {
            mario1.style.visibility = "hidden"
            if (state === 1 ) {
                mario2.style.visibility = "hidden"
                mario3.style.visibility = "visible"
            }
            if (state === 0) {
                mario2.style.visibility = "visible"
                mario3.style.visibility = "hidden"
            }
        }

        if (left === true && leftCollision()) {
            playerCharacter.style.webkitTransform = "scaleX(-1)"
        }

        if (right === true && rightCollision()) {
            playerCharacter.style.webkitTransform = "scaleX(1)"
        }
    }
}
