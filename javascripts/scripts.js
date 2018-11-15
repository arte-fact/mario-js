window.onload = function () {
    let container = document.getElementById("container")

    let altitude = 550
    let stageSize = 3000

    let state = 0

    generateForeground()
    let midGround = generateMidground()
    container.appendChild(midGround)
    generateBackground()


    let playerSprites = [
        'static/mario1.png',
        'static/mario2.png',
        'static/mario3.png'
    ]

    let zombieSprites = [
        'static/zombie/1.png',
        'static/zombie/2.png',
        'static/zombie/3.png'
    ]

    let zombies = []

    for (let i = 0; i < 5; i++) {
        let zombie = new Character(zombieSprites, 800 + 500 * i , 200, 1, 5, 2, 100, 130, `zombie-${i}`)
        zombie = zombie.spawn(container)
        zombie.printCharacter(container)
        zombies.push(zombie)
    }

    let player = new Character(playerSprites, 300 , 200, 20, 5, 15, 40, 50, "player")
    player = player.spawn(container)
    player.printCharacter(container)
    play()

    window.addEventListener("keypress", function (event) {
        switch (event.key) {
            case " ": player.isJumping = true
                break
            case "d": player.right = true
                break
            case "q": player.left = true
                break
        }
    });

    window.addEventListener("keyup", function onKeyUp(event) {
        switch (event.key) {
            case " ": player.isJumping = false
                break
            case "d": player.right = false
                break
            case "q": player.left = false
                break
        }
    });

    function play() {
        setInterval(function () {

            let playerRelativeX = player.character.offsetLeft - container.scrollLeft

            player.operateGravity(altitude)
            player.direction()
            player.run()
            player.move()
            player.animate(state)
            // player.debug()

            for (let j = 0; j < zombies.length; j++) {
                let zombie = zombies[j]
                followPlayer(zombie, player)
                zombie.operateGravity(altitude)
                zombie.animate(state)
                zombie.direction()
                zombie.run()
                zombie.move()
            }

            autoScroll(playerRelativeX)
        }, 16)

        setInterval(function () {
            if (state === 0) {
                state++
            } else {
                state--
            }
        }, 66)
    }

    function autoScroll(playerRelativeX) {
        if (playerRelativeX > 400) {
            container.scrollLeft += Math.abs(player.speed)
        }

        if (playerRelativeX < 200) {
            container.scrollLeft -= Math.abs(player.speed)
        }
    }

    function generateBackground() {
        let background = document.createElement("div")
        background.style.position = "fixed"
        background.style.top = "0px"
        background.style.backgroundImage = "url('static/far-buildings.png')"
        background.style.backgroundSize = "1100px"
        background.style.height= "800px"
        background.style.width = "800px"
        background.style.zIndex = 0

        background.style.overflow = "hidden"

        container.appendChild(background)
    }

    function generateForeground() {
        let foreGround = document.createElement("div")
        foreGround.style.position = "absolute"
        foreGround.style.top = "0px"
        foreGround.style.backgroundImage = "url('static/foreground.png')"
        foreGround.style.backgroundSize = "1100px"
        foreGround.style.height= "1200px"
        foreGround.style.width = stageSize + "px"
        foreGround.style.zIndex = 2

        container.appendChild(foreGround)
    }

    function generateMidground() {
        let midGround = document.createElement("div")
        midGround.style.position = "absolute"
        midGround.style.top = "0px"
        midGround.style.backgroundImage = "url('static/back-buildings.png')"
        midGround.style.backgroundSize = "1100px"
        midGround.style.height= "800px"
        midGround.style.width = stageSize + "px"
        midGround.style.zIndex = 1

        return midGround
    }

    function followPlayer(entity, player) {
        if (entity.character.offsetLeft > player.character.offsetLeft) {
            entity.left = true
            entity.right = false
        } else {
            entity.left = false
            entity.right = true
        }
    }
}
