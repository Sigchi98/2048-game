export default class tile {
    #tileElement
    #x
    #y
    #value
/* create tilecontainer to store tile and assign a random value of either 2 or 4 onto 
new empty cells. create a div with class of tile and add tileElement value onto the tilecontainer*/ 

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileElement = document.createElement("div") 
        this.#tileElement.classList.add("tile")
        tileContainer.append(this.#tileElement)
        this.value = value
    }

get value() {
    return this.#value
}


    set value(v) {
        this.#value = v
        this.#tileElement.textContent = v
        const power = Math.log2(v) /*determine how many times the number is raised to the power of 2. 
        2 returns 1 4 returns 2 8 returns 3 and so on */
        const backgroundLightness = 100 - power * 9 /*as value of power increases decrease backgroundlightness
         by 9 % */
        this.#tileElement.style.setProperty("--background-lightness", `${backgroundLightness}%`)
        this.#tileElement.style.setProperty("--text-lightness", `${backgroundLightness <= 50 ? 90 : 10}%`)
    }

    set x(value) {
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }

    set y(value) {
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }

    remove() {
        this.#tileElement.remove()
    }

    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this.#tileElement.addEventListener(animation ? "animationend" : "transitionend", resolve, 
            {once: true})
        })
    }
}

// what promises is doing is waiting for animation to finish and then adding the nos. 