

const Game = function(window) {
    
    const test = (text) => this.call(window, alert(`aa`))

    const changeText = (id,newText) => {
        const element = window.document.getElementById(toString(id));
        element.textContent = newText;
    }
    

    return { test, changeText }
}




export { Game };