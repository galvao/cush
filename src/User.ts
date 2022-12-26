class User
{
    name: string;
    roleIndicator: string;

    constructor (name:string = 'guest')
    {
        this.name = name;
        this.roleIndicator= '$';
    }
}

export { User };
