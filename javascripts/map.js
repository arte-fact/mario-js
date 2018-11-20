function Map (params) {
    this.container = document.getElementById("container")
    this.params = params

    this.scroll = function (player) {
        let playerRelativeX = player.character.offsetLeft - this.container.scrollLeft

        if (playerRelativeX > 400) {
            this.container.scrollLeft += Math.abs(player.speed)
        }

        if (playerRelativeX < 200) {
            this.container.scrollLeft -= Math.abs(player.speed)
        }
    }

    for (let i = 0; i < this.params.length; i++) {
        generateLayer(this.params[i])
    }

    function generateLayer(param) {
        let layer = document.createElement("div")
        layer.style.position = param.position
        layer.style.top = param.top
        layer.style.backgroundImage = `url('${param.url}')`
        layer.style.backgroundSize = param.backgroundSize
        layer.style.height= param.height
        layer.style.width = param.width
        layer.style.zIndex = param.zIndex

        layer.style.overflow = param.overflow

        this.container.appendChild(layer)
    }
}