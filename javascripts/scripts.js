window.onload = function () {
    let altitude = 550
    let frame = 0

    let map = new Map(city)

    let skeletons = []

    for (let i = 0; i < 5; i++) {
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

            player.operateGravity(altitude)
            player.direction()
            player.run()
            player.move()
            player.animate(frame)
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
            // player.debug()
            map.scroll(player)
            frame++

        }, 16)
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
