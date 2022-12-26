import { stat } from 'node:fs';

class Command
{
    args?: string[];
    flags?: Object[];
    identifier: string;
    subCommand?: string;

    constructor(identifier: string, subCommand?: string, flags?: Object[], args?: string[])
    {
        this.identifier = identifier;
        this.subCommand = subCommand;
        this.flags = flags;
        this.args = args;
    }

    load()
    {
        const modulePath = `${__dirname}/Module`;
        const moduleFilename = this.identifier.charAt(0).toUpperCase().concat(this.identifier.substring(1));

        stat(`${modulePath}/${moduleFilename}.js`, (err, stats) => {
            // console.log(modulePath);
            console.log(err);
            // console.log(stats);
        });

        let commandMod = require(`${modulePath}/${moduleFilename}`);

        return new commandMod.constructor(this);
    }
}

export { Command };
