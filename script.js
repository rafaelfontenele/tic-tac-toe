



const testBtn = document.querySelector('.test-btn')
testBtn.addEventListener('click', (e) => test());
function test() {
    const ttt = document.querySelector('.ttt-text');
    toggleActive(ttt);
}

function toggleActive(element) {
    const clsList = element.classList;
    if (clsList.contains('inactive') && clsList.contains('active')) {
        return
        //element.classList.remove('inactive');
        //element.classList.remove('active');
    } else {
    if (clsList.contains('inactive')) {
        element.classList.remove('inactive');
        element.classList.add('active');
    } else {
        element.classList.remove('active');
        element.classList.add('inactive');
    }
    }
}


function removeClass(element, cls) {
    if (!typeof element == HTMLElement || !typeof  cls=='string') return

    if (element.classList.contains(cls)) element.classList.remove(cls);
}

function addClass(element, cls) {
    if (!typeof element == HTMLElement || !typeof cls == 'string') return

    if (!element.classList.contains(cls)) element.classList.add(cls);
    console.log(element.classList)
}