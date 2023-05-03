

export const Player = (name, isBot, color) => {
    let wins = 0;
    let losses = 0;
    let bot = isBot;

    const display = () => {
        alert(`Name= ${name}\nWins = ${wins}\nLosses = ${losses}\nBot = ${bot}`);
    }


    const changeWins = (number) => {
        if (typeof number != 'number') {
            return
        }

        console.log(`prev = ${wins}`)
        wins = wins + number;
        console.log(`wins = ${wins}`)
    }

    const getIconClasses = () => {
        let iconClasses = [];
        if (!bot) {
            iconClasses.push('player');
        } else {
            iconClasses.push('robot');
        }
        iconClasses.push(color);
        
        return iconClasses
    }




    return { name, wins, losses, bot, color, display, changeWins, getIconClasses }
}