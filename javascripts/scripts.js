window.onload = function () {
    let keyBox = document.getElementById('character')
    let mario1 = document.getElementById('mario1')
    let mario2 = document.getElementById('mario2')
    let mario3  = document.getElementById('mario3')
    let x = 20
    let y = 20
    let speed = 0
    let maxSpeed = 2

    let altitude = 60
    let gravity = 3
    let acceleration = 0.05

    mario1.style.visibility = "visible"
    mario2.style.visibility = "hidden"
    mario3.style.visibility = "hidden"

    keyBox.style.position = "absolute"

    keyBox.style.top = x + "%"
    keyBox.style.left = y + "%"

    let left = false;

    let right = false;
    let spaceBar = false;
    play()

    window.addEventListener("keypress", function (event) {
        if (event.key === " ") {
            spaceBar = true
        }
        if (event.key === "d") {
            right = true;
        }
        if (event.key === "q") {
            left = true;
        }
    });

    window.addEventListener("keyup", function onKeyUp(event) {
        if (event.key === " ") {
            spaceBar = false;
        }
        if (event.key === "d") {
            right = false;
        }
        if (event.key === "q") {
            left = false;
        }
    });

    function play() {
        let state = 1
        setInterval(function () {
            document.getElementById("speed").innerText = "Speed: " + speed
            document.getElementById("left").innerText = "left: " + left
            document.getElementById("right").innerText = "right: " + right
            document.getElementById("spacebar").innerText = "spacebar: " + spaceBar

            if (left === true) {
                mario1.style.visibility = "hidden"
                mario2.style.visibility = "hidden"
                mario3.style.visibility = "visible"
                keyBox.style.webkitTransform = "scaleX(-1)"

                x -= speed
                keyBox.style.left = x + "%"
            }

            if (right === true) {
                mario1.style.visibility = "hidden"
                mario2.style.visibility = "visible"
                mario3.style.visibility = "hidden"

                keyBox.style.webkitTransform = "scaleX(1)"
                x += speed
                keyBox.style.left = x + "%"
            }

            if (left === false && right === false) {
                mario1.style.visibility = "visible"
                mario2.style.visibility = "hidden"
                mario3.style.visibility = "hidden"
            }

            if (left === false && right === false) {
                if (speed > 0) {
                    speed -= acceleration
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
                y -= gravity
                keyBox.style.top = y + "%"
            }

            if (y < altitude && spaceBar === false) {
                y += gravity
                keyBox.style.top = y + "%"
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
