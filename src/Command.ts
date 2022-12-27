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

    load(): Function
    {
        const modulePath = `${__dirname}/Module`;
        const moduleFilename = this.identifier.charAt(0).toUpperCase().concat(this.identifier.substring(1));

        // try {
        //     stat(`${modulePath}/${moduleFilename}.js`, (err, stats) => {
        //         if (err) {
        //             return err;
        //         }
        //     });
        // } catch(e:any) {
        //     return `${this.identifier}: Command not found.`;
        // }

        let commandMod = require(`${modulePath}/${moduleFilename}`);

        return new commandMod.constructor(this);
    }
}

export { Command };
