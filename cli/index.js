#!/usr/bin/env node
const {program} = require('commander')
const commands = require('./commands')

const __version__ = require('../package.json').version

program
  .name('vue2-sfc-document')
  .version(__version__)

// mount commands
Object
  .values(commands)
  .forEach(commandHandler => {
    commandHandler(program)
  })

program.parse()
