import { stat, existsSync } from 'node:fs';
import { Shell } from './Shell';

class Parser
{
    public moduleFilename: string;
    public command: any;
    public shell: Shell;

    public constructor(shell: Shell, input: string)
    {
        this.shell = shell;
        this.command = {};
        this.moduleFilename = '';

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
                    name = part.replace(/-+/, '');

                    if (name.match(/=/)) {
                        let flagParts = name.split(/=/);

                        name = flagParts[0].trim();
                        value = flagParts[1].trim();
                    }
                } else {
                    name = part.substring(1).trim();
                }

                flags.push(
                    Object.defineProperty(
                        {},
                        name,
                        {
                            value: value,
                            enumerable: true,
                            writable: false
                        }
                    )
                );
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
            try {
                this.load(identifier, subCommand, flags, args);
            } catch (err: any) {
                throw(err);
            }
        }
    }

    private load(identifier: string, subCommand?: string, flags?:Object[], args?:string[]): void
    {
        const modulePath = `${__dirname}/Module`;
        const moduleFilename = identifier.charAt(0).toUpperCase().concat(identifier.substring(1)) + '.js';
        const fullPath = `${modulePath}/${moduleFilename}`;

        if (existsSync(fullPath) === false) {
            throw new Error(`${identifier}: Command not found.`);
        }

        this.command = new (require(`${modulePath}/${moduleFilename}`)).moduleClass(identifier, subCommand, flags, args);

        if (subCommand !== undefined) {
            if (typeof this.command[subCommand] !== 'function') {
                throw new Error(`${subCommand}: subCommand not found in ${identifier}.`);
            }
        }
    }
}

export { Parser };
