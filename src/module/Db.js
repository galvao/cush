'use strict';

class Db
{
    context;

    constructor()
    {
        this.context = 'db';
    }

    configure()
    {
    }
}

module.exports = {
    obj: Db
};
