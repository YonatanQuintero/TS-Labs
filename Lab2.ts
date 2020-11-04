/**
 * Dado el siguiente array [0,0,0,1,0,99] se debe avanzar hasta 
 * el número 99 para poder ganar el juego, pero si se encuentra con el
 * número 1, no puede avanzar, pero puede recurrir a un salto de n posiciones
 * solo una vez, si vuelve y cae en un número 1, entonces se da como
 * perdio el juego.
 */

//const data = [0, 0, 0, 1, 99];
//const skips = 2;
const data = [0, 0, 0, 1, 1, 1, 0, 99];
const skips = 3;
const size = data.length;

function init(): void {

    let playing = size > 0;
    let hasSkip = true;
    let position = 0;
    let value = 0;

    while (playing) {
        value = data[position];
        switch (value) {
            case 0:
                position = forward(position);
                break;
            case 1:
                if (hasSkip) {
                    position = skip(position);
                    hasSkip = false;
                } else {
                    playing = false;
                }
                break;
            case 99:
                playing = false;
                break;
        }
    }

    printState(value);

}

function forward(position: number): number {
    let forwardPosition = position + 1;
    if (forwardPosition < size) return forwardPosition;
    else return position;
}

function skip(position: number): number {
    let skipPosition = (position + skips) - 1;
    if (skipPosition < size) return skipPosition;
    else return position;
}

function printState(value: number): void {
    if (value == 99) {
        console.log('You win!. Game over');
    } else {
        console.log('Game over. You lost!');
    }
}

init();