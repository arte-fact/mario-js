window.onload = function () {
    const socket = new SockJS('//localhost:8080/websocket/tracker');
    let stompClient = Stomp.over(socket);
    stompClient.debug = null
    stompClient.connect({},
        () => {

        const id = makeId(6)

            stompClient.send(
                `/topic/tracker`,
                {},
                JSON.stringify({ type: "connection", id: id }),

            );
            load(stompClient, id)
        })
}

function makeId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function load(stompClient, id) {
    let altitude = 550
    let frame = 0
    let players = []
    let ids = []

    let map = new Map(city)

    // let skeletons = []
    //
    // for (let i = 0; i < 5; i++) {
    //     let newSkeleton = new Character(skeleton, 500 * i , 200, `skeleton-${i}`)
    //     newSkeleton = newSkeleton.spawn(container)
    //     newSkeleton.printCharacter(container)
    //     skeletons.push(newSkeleton)
    // }

    let player = new Character(adventurer, 300 , 200, "player")
    player = player.spawn(container)
    player.printCharacter(container)

    // player[0] = player[0].spawn(container)
    // player[0].printCharacter(container)
    play(stompClient, id)

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

    function play(stompClient, playerId) {
        stompClient.subscribe(`/topic/tracker`, data => {
            const message = JSON.parse(data.body);
            if (message.type === 'player-move' && message.id !== playerId){
                if (players[message.id] == undefined ) {
                    players[message.id] = new Character(adventurer, 300 , 200, message.id)
                    players[message.id] = players[message.id].spawn(container)
                    players[message.id].printCharacter(container)
                    ids.push(message.id)
                    console.log(players)
                }
                players[message.id].x = message.data.x
                players[message.id].y = message.data.y
                players[message.id].left = message.data.left
                players[message.id].right = message.data.right
                players[message.id].isJumping = message.data.isJumping
                players[message.id].attack = message.data.attack
            }
        })

        setInterval(function () {
            let oldPos = {
                x: player.x,
                y: player.y,
                left: player.left,
                right: player.right,
                isJumping: player.isJumping,
                attack: player.attack
            }

            // displayPlayers()

            player.operateGravity(altitude)
            player.direction()
            player.run()
            player.move()
            player.animate(frame)

            map.scroll(player)
            frame++

            let newPos = {
                x: player.x,
                y: player.y,
                left: player.left,
                right: player.right,
                isJumping: player.isJumping,
                attack: player.attack
            }

            if (
                oldPos.x !== newPos.x ||
                oldPos.y !== newPos.y ||
                oldPos.left !== newPos.left ||
                oldPos.right !== newPos.right ||
                oldPos.isJumping !== newPos.isJumping ||
                oldPos.attack !== newPos.attack ||
                frame% 60 === 0
            ) {
                stompClient.send(
                    `/topic/tracker`,
                    {},
                    JSON.stringify({id: playerId, type: "player-move", data: newPos}),
                );
            }

            for(let k = 0; k < ids.length; k++) {
                players[ids[k]].operateGravity(altitude)
                players[ids[k]].direction()
                players[ids[k]].run()
                players[ids[k]].move()
                players[ids[k]].animate(frame)
                // players[ids[k]].debug()

            }


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
