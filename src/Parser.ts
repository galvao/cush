import { Command } from './Command';

class Parser
{
    moduleFilename: string;
    command: any;

    constructor(input: string)
    {
        this.moduleFilename = '';

        this.command = {};

        let inputParts = input.split(/\s/);
        let identifier = inputParts.shift();
        let subCommand = undefined;
        let args = [];
        let flags = [];
        let partCounter = 0;

        for (let part of inputParts) {
            let name = part;
            let value = null;

            if (part.at(0) === '-') {
                if (part.at(1) === '-') {
                    name = part.replace(/-/, '');

                    if (name.match(/=/)) {
                        let flagParts = name.split(/=/);

                        name = flagParts[0].trim();
                        value = flagParts[1].trim();
                    }
                } else {
                    let name = part.substring(1).trim();
                }

                flags.push({name: value});
            } else {
                if (partCounter === 0) {
                    subCommand = part.trim();
                } else {
                    args.push(part.trim());
                }
            }

            partCounter++;
        }

        if (identifier !== undefined) {
            this.command = new Command(identifier, subCommand, flags, args);
        }
    }
}

export { Parser };
