#! /usr/bin/env node

declare var require: Function
declare var process: any

const readline = require('readline');

// process is a built-in module

let host = 'localhost';
let user = 'anon';
let role = '$';
let inPrompt = `[${user}${role}] > `;
let outPrompt = `[${user}${role}] < `;

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: inPrompt
});

cli.prompt();

const openInput = (input) => {
    input = input.trim();

    if (input == 'q') {
        cli.close();
        return;
    }

    console.log(`${input}`);
    cli.prompt();
};


cli.on('line', openInput);

cli.on('close', () => {
    console.log('Thanks for using it!');
});
