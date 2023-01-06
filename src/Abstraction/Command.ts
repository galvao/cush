abstract class Command
{
    protected args?: string[];
    protected flags?: Object[];
    protected identifier: string;
    protected subCommand?: string;
    // protected validFlags: Object = Object.create(null, {
    //     required: {
    //         value: [], 
    //         enumerable: true, 
    //         writable: true
    //     }
    // });
    protected validFlags: Object = {required: [], optional: []};

    public constructor(identifier: string, subCommand?: string, flags?: Object[], args?: string[])
    {
        this.identifier = identifier;
        this.subCommand = subCommand;
        this.flags = flags;
        this.args = args;
    }

    public validate()
    {
        console.log(Object.create(this.validFlags).required);
        // for (const requiredFlag in this.validFlags[required) {
        // }
    }

    public abstract help(): string;
    public abstract about(): string;
}

export { Command as CommandAbstraction };
