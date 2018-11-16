window.onload = function () {
    let container = document.getElementById("container")

    let altitude = 550
    let stageSize = 3000

    let frame = 0

    generateForeground()
    let midGround = generateMidground()
    container.appendChild(midGround)
    generateBackground()

    let skeletons = []

    for (let i = 0; i < 15; i++) {
        let newSkeleton = new Character(skeleton, 500 * i , 200, `skeleton-${i}`)
        newSkeleton = newSkeleton.spawn(container)
        newSkeleton.printCharacter(container)
        skeletons.push(newSkeleton)
    }

    let player = new Character(adventurer, 300 , 200, "player")
    player = player.spawn(container)
    player.printCharacter(container)
    play()

    window.addEventListener("keypress", function (event) {
        switch (event.key) {
            case "z": player.isJumping = true
                break
            case "d": player.right = true
                break
            case "q": player.left = true
                break
            case " ": player.attack = true
                break
        }
    });

    window.addEventListener("keyup", function onKeyUp(event) {
        switch (event.key) {
            case "z": player.isJumping = false
                break
            case "d": player.right = false
                break
            case "q": player.left = false
                break
            case " ": player.attack = false
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
            player.animate(frame)
            // player.debug()

            for (let j = 0; j < skeletons.length; j++) {
                let skeleton = skeletons[j]
                findAndKill(skeleton, player)
                skeleton.operateGravity(altitude)
                skeleton.animate(frame)
                skeleton.direction()
                skeleton.run()
                skeleton.move()
                // skeleton.debug()
            }

            autoScroll(playerRelativeX)
            frame++

        }, 16)
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

    function findAndKill(entity, player) {
        let dist = Math.abs(entity.character.offsetLeft - player.character.offsetLeft)

        if (dist < 100) {
            entity.attack = true
        } else if (dist > 600) {
            entity.attack = false
            entity.left = false
            entity.right = false
        } else if (entity.character.offsetLeft > player.character.offsetLeft) {
            entity.left = true
            entity.right = false
        } else if (entity.character.offsetLeft < player.character.offsetLeft) {
            entity.left = false
            entity.right = true
        }
    }
}
