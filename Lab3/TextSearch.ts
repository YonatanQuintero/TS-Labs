class TextSearch {

    private text: string;
    private prefix: string;
    private result: Record<string, number>;

    constructor(text: string, prefix: string) {
        this.text = text;
        this.prefix = prefix.toLowerCase();
        this.result = {};
    }

    /**
   * @return Map with the times that word is found in the text, using prefix
   */
    search(): Record<string, number> {
        const normalizeText = this.normalizeText();
        for (let character of this.split(normalizeText)) {
            if (character.toLowerCase().startsWith(this.prefix)) {
                this.addOrUpdated(character);
            }
        }
        return this.result;
    }


    /**
     * @return highlight text in html format
     */
    highlightText(): string {

        const builder = [];
        const split = this.split(this.text);

        for (let i = 0; i < split.length; i++) {
            if (i > 0) builder.push(" ");
            let character = split[i];

            if (character.toLowerCase().startsWith(this.prefix)) character = this.highlightCharacter(character);

            builder.push(character);
        }

        return builder.join("");
    }

    private normalizeText(): string {
        return this.text.replace(/[^A-Z0-9\s]/gi, "");
    }

    private split(value:string): Array<string> {
        return value.split(/\s/gi);
    }

    private addOrUpdated(character: string) {
        let value = 1;
        if (this.result[character] !== undefined) value = this.result[character] + 1;

        this.result[character] = value;
    }

    private highlightCharacter(character: string): string {
        let auxCharacter = character.substring(0, this.prefix.length);
        const auxBuilder = [];
        auxBuilder.push("<span class='highlight-prefix'>");
        auxBuilder.push(auxCharacter);
        auxBuilder.push("</span>");

        auxCharacter = character.substring(this.prefix.length, character.length);
        if (auxCharacter !== null) auxBuilder.push(auxCharacter);

        return auxBuilder.join("");
    }
}

function test() {

    const text = "Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It's not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.”";
    const prefix = "LO";

    const textSearch = new TextSearch(text, prefix);

    const result = textSearch.search();
    for (let r in result) {
        console.log(`${r} (${result[r]})`);
    }

    const highlightText = textSearch.highlightText();
    console.log(highlightText);
}

//test();