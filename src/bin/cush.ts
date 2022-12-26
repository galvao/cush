#! /usr/bin/env node

/**
 * CuSh - the Custmized Shell
 * @version 0.1.0
 * @author Er Galvão Abbott <galvao@galvao.eti.br>
 * @license MIT
 */

import { User } from '../User';
import { Shell } from '../Shell';

let user = new User();
let shell = new Shell(user);

shell.cli.prompt();
