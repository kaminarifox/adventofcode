export class AOCInput {
    #colsDelimiter;
    #rowsDelimiter;
    #raw;
    #parser;

    constructor(params) {
        this.#colsDelimiter = params.colsDelimiter || /\s+/;
        this.#rowsDelimiter = params.rowsDelimiter || '\n';
        this.#raw = params.raw;
        this.#parser = params.parser
    }
    static async fetch(params = { day, year, session, rowsDelimiter, colsDelimiter, parser, raw }) {
        const conf = { headers: { Cookie: `session=${params.session}` } };

        params.raw ||= await fetch(`https://adventofcode.com/${params.year}/day/${params.day}/input`, conf)
            .then(r => r.text())
            .then(r => r.trim());

        return new AOCInput(params);
    }

    set settings(s) {
        this.#parser = s.parser ?? this.#parser;
        this.#rowsDelimiter = s.rowsDelimiter ?? this.#rowsDelimiter;
        this.#colsDelimiter = s.colsDelimiter ?? this.#colsDelimiter;
    }

    get text() {
        return this.#raw;
    }

    get lines() {
        return this.#raw.split(this.#rowsDelimiter);
    }

    get matrixRows() {
        return this.lines.map(line => line.split(this.#colsDelimiter).map(val => this.#parser(val)))
    }

    get matrixCols() {
        const mr = this.matrixRows
        const mc = []

        for (let i = 0; i < mr[0].length; i++) {
            mc.push([])
            for (let j = 0; j < mr.length; j++) {
                mc[i].push(mr[j][i])
            }
        }

        return mc;
    }
}

