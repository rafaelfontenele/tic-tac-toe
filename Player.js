

export const Player = (name, isBot) => {
    let wins = 5;
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




    return { name, wins, losses, bot, display, changeWins }
}