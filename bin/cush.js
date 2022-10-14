#! /usr/bin/env node

'use strict';

const process = require('node:process');
const readline = require('node:readline');
const Parser = require('../src/Parser');

let context = 'localhost';
let user = 'guest';
let role = '$';
let inPrompt = "[ ".concat(user, '@', context, role, " ]");

let cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: inPrompt
});

cli.prompt();

let openInput = async function (input) {
    if (cli.getPrompt().match(/db/)) {
        const mysql = require('mysql');

        const db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'foo'
        });

        db.query(input.trim(), (err, rows, fields) => {
            console.log(JSON.stringify(rows));
        });
    }

    if (input == 'q') {
        cli.close();
        return;
    }


    let processing = new Parser.Parser(input);
    let processor = new processing.processor.obj;

    cli.setPrompt(cli.getPrompt().replace(context, processor.context));


    console.log("".concat(input));
    cli.prompt();
};

cli.on('line', openInput);

cli.on('close', function () {
    console.log('Thanks for using it!');
});
