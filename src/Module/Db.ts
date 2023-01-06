import { CommandAbstraction } from '../Abstraction/Command';
import { writeFile } from 'node:fs';

class Db extends CommandAbstraction
{
    public setCommand()
    {
        // this.command = command;
    }

    public configure(): void
    {
        const path = '../data/Db';
        writeFile(path.concat('/config.json'), 'foo', (err) => { if (err) throw err; });
    }

    public help(): string
    {
        return '';
    }

    public about(): string
    {
        this.validFlags = {required: ['a'], optional: ['b']};
        return 'foo';
    }
}

export { Db as moduleClass };
