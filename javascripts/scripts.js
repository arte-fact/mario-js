window.onload = function () {
    let playerCharacter = document.getElementById('character')
    let container = document.getElementById("container")
    let mario1 = document.getElementById('mario1')
    let mario2 = document.getElementById('mario2')
    let mario3  = document.getElementById('mario3')
    let x = 200
    let y = 200
    let speed = 0
    let maxSpeed = 10
    let altitude = 400
    let gravity = 20
    let acceleration = 1
    let desceleration = 1
    let jumpHeight = 200

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
        let state = 1
        setInterval(function () {

            let playerRelativeX = playerCharacter.offsetLeft - container.scrollLeft

            if (left === true && playerCharacter.offsetLeft > 50) {
                mario1.style.visibility = "hidden"
                mario2.style.visibility = "hidden"
                mario3.style.visibility = "visible"
                playerCharacter.style.webkitTransform = "scaleX(-1)"

                x -= speed
                playerCharacter.style.left = x + "px"
            }

            if (right === true && playerCharacter.offsetLeft < stageSize) {
                mario1.style.visibility = "hidden"
                mario2.style.visibility = "visible"
                mario3.style.visibility = "hidden"

                playerCharacter.style.webkitTransform = "scaleX(1)"
                x += speed
                playerCharacter.style.left = x + "px"
            }

            if (left === false && right === false) {
                mario1.style.visibility = "visible"
                mario2.style.visibility = "hidden"
                mario3.style.visibility = "hidden"
            }

            if (left === false && right === false) {
                if (speed > 0) {
                    speed -= desceleration
                } else {
                    speed = 0
                }
            }

            if (left === true || right === true) {
                if (speed < maxSpeed) {
                    speed += acceleration
                }
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

            if (y < altitude && spaceBar === false) {
                y += gravity
                playerCharacter.style.top = y + "px"
            }

            if (playerRelativeX > 350) {
                container.scrollLeft += Math.ceil(speed)
            } else {
                container.scrollLeft = x - 100
            }

            if (playerRelativeX < 200) {
                container.scrollLeft -= Math.ceil(speed)
            }


        }, 16)

        setInterval(function () {
            if (state === 0) {
                state++
            } else {
                state--
            }
        }, speed * 50)
    }
}


function generateWorld(altitude, container, stageSize) {
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