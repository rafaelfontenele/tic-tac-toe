

const Game = (window) => {

    const changeText = (id,newText) => {
        const element = window.document.getElementById(id);
        window.alert(element.textContent);
        element.textContent = newText;
    }

    return { changeText };
}




export { Game };