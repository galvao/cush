import { User } from './User';
import { Parser } from './Parser';

class Shell
{
    public prompt: string;
    private user: User;
    public process: any;
    public readline: any;
    public cli: any;

    public location: string;

    constructor(user:User, lazy:boolean = true)
    {
        const process = require('node:process');
        const readline = require('node:readline');

        this.user = user;
        this.location = 'localhost';

        this.prompt = ''.concat(
            '[ ',
            this.user.name,
            '@',
            this.location,
            user.roleIndicator,
            ' ] '
        );

        this.cli = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: this.prompt
        });

        if (lazy === true) {
            this.init();
        }
    }

    init(): void
    {
        this.cli.on('line', (input: string) => {
            input = input.trim();
            console.log(input);

            if (input === 'quit') {
                this.cli.close();
                return;
            }

            let parser = new Parser(input);
            let result = parser.command.load();

            this.cli.prompt();
        });
    }

    getInterface(): Object
    {
        return this.cli;
    }
}

export { Shell };
