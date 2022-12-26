import { Command } from '../Command';

class Db
{
    constructor(command: Command)
    {
        console.log(command);
    }

    configure()
    {
    }
}

export { Db };
