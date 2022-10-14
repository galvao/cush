'use strict';

class Parser
{
    identifier;
    args;
    processor;
    validProcessors = {
        'db': 'Db'
    };

    constructor(input)
    {
        input = input.trim();
        let inputParts = input.split(/\s/);

        this.identifier = inputParts.shift();
        this.args = {};

        for (let part of inputParts) {
            let val = null;

            if (part.at(0) === '-') {
                let arg = part.replace(/-/, '');

                if (arg.match(/=/)) {
                    let argParts = arg.split(/=/);

                    arg = argParts[0].trim();
                    val = argParts[1].trim();
                }

                Object.defineProperty(this.args, arg, {value: val, writable: false, enumerable: true});
            }
        }

        this.processor = require('./module/Db');
    }
}

module.exports = {Parser: Parser};
