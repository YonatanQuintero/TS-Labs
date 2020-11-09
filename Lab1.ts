/**
 * Dado un string formado por (),[],{}, escribe un programa que indiquie
 * si los pares correspondientes son correctos.
 * Entrada: [()]{}{[()()]()} -> Correcto
 * Entrada: [(])
 */

const symbols = ['()', '[]', '{}'];
const inputs = ['[()]{}{[()()]()}', '[(])', '[()]{}{[({})()]()}', '[()]{}{[({})[(})]()}'];

function initLab1(): void {

    console.time('Execution Time');
    inputs.forEach(input => {
        correctPairs(input);
        //validate(input);
        //let result:boolean = validate(input);
        //console.log(`Resultado: \n > La entrada ${input} es: ${result}`);    
    });
    console.timeEnd('Execution Time');
}

function isOpen(character: string): boolean {
    return ['[', '{', '('].indexOf(character) > -1;
}

function closes(characterA: string, characterB: string): boolean {
    let pairs: Record<string, string> = { '{': '}', '[': ']', '(': ')' };
    return pairs[characterA] === characterB;
}

function validate(text: String): boolean {
    let stack = [];
    for (let character of text.split('')) {
        if (isOpen(character)) {
            stack.push(character);
        } else {
            let topChar = stack.pop();
            if (!closes(topChar!, character)) {
                return false;
            }
        }
    }
    return stack.length === 0;
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

    //console.log(`Resultado: \n > La entrada ${input} es: ${lenght == 0}`);
}

initLab1();