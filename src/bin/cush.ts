#! /usr/bin/env node

/**
 * CuSh - the Custmized Shell
 * @version 0.1.0-alpha
 * @author Er Galvão Abbott <galvao@galvao.eti.br>
 * @license MIT
 */

import { User } from '../User';
import { Shell } from '../Shell';

let shell = new Shell(new User());

shell.cli.prompt();
