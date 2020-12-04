const fs = require('fs');
const input = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n\n').map(data => {
    return data.match(/[a-z]{3}:[^\s]+/g).reduce((p, c) => {
        const [field, value] = c.split(':');
        return {[field]: value, ...p};
    }, {});
});

class Passport {
    static #requiredFields = {
        byr: {valid: (f) => f >= 1920 && f <= 2020},
        iyr: {valid: (f) => f >= 2010 && f <= 2020},
        eyr: {valid: (f) => f >= 2020 && f <= 2030},
        hgt: {valid: (f) => {
            if (f && f.endsWith('cm')) { return parseInt(f) >= 150 && parseInt(f) <= 193; }
            if (f && f.endsWith('in')) { return parseInt(f) >= 59 && parseInt(f) <= 76; }
        }},
        hcl: {valid: (f) => /^#[0-9abcdef]+/.test(f)},
        ecl: {valid: (f) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(f)},
        pid: {valid: (f) => /^[0-9]{9}$/.test(f)}
    };
    static validate(passport, simple = false) {
        return simple
            ? Object.keys(this.#requiredFields)
                .reduce((p, c) => p && Object.keys(passport).includes(c), true)
            : Object.keys(this.#requiredFields)
                .reduce((p, c) => p && this.#requiredFields[c].valid(passport[c]), true);
    }
}

// First puzzle
console.log(input.filter(passport => Passport.validate(passport, true)).length);

// Second puzzle
console.log(input.filter(passport => Passport.validate(passport)).length);
