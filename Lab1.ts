/**
 * Dado un string formado por (),[],{}, escribe un programa que indiquie
 * si los pares correspondientes son correctos.
 * Entrada: [()]{}{[()()]()} -> Correcto
 * Entrada: [(])
 */

const symbols = ['()', '[]', '{}'];
const inputs = ['[()]{}{[()()]()}', '[(])', '[()]{}{[({})()]()}', '[()]{}{[({})[(})]()}'];

function init(): void {

    inputs.forEach(input => {
        correctPairs(input);
    })
}

function correctPairs(input: string): void {

    let auxInput = input;
    let subString = null;
    let lenght = auxInput.length;
    let index = 0;
    let beginIndex = 0;
    let endIndex = index + 2;
    let hasChars = true;

    if (lenght > 1 && lenght % 2 == 0) {
        do {

            index++;
            subString = auxInput.substring(beginIndex, endIndex);
            if (symbols.indexOf(subString) > -1) {
                auxInput = auxInput.replace(subString, '');
                lenght = auxInput.length;
                index = 0;
            }
            beginIndex = index;
            endIndex = index + 2;
            hasChars = endIndex <= lenght;

        } while (hasChars);
    }

    console.log(`Resultado: \n > La entrada ${input} es: ${lenght==0}`);
}

init();