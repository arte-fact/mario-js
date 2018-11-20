const ABSOLUTE = "absolute"
const FIXED = "fixed"
const HIDDEN = "hidden"
const BACKGROUND_SIZE = "1100px"
const ZERO_PX = "0px"
const STAGE_SIZE = "3000px"
const SCREEN_HEIGHT = "600px"
const SCREEN_WIDTH = "800px"

const city = [
    {
        "position": FIXED,
        "top": ZERO_PX,
        "url": "static/far-buildings.png",
        "backgroundSize": BACKGROUND_SIZE,
        "height": "",
        "width": SCREEN_WIDTH,
        "zIndex": "0",
        "overflow": HIDDEN
    },
    {
        "position": ABSOLUTE,
        "top": ZERO_PX,
        "url": "static/back-buildings.png",
        "backgroundSize": BACKGROUND_SIZE,
        "height": SCREEN_HEIGHT,
        "width": STAGE_SIZE,
        "zIndex": "1",
        "overflow": HIDDEN
    },
    {
        "position": ABSOLUTE,
        "top": ZERO_PX,
        "url": "static/foreground.png",
        "backgroundSize": BACKGROUND_SIZE,
        "height": SCREEN_HEIGHT,
        "width": STAGE_SIZE,
        "zIndex": "2",
        "overflow": HIDDEN
    }
]
