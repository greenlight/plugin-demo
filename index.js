#!/usr/bin/env node

const sentencer = require('sentencer')

const severity = ['info', 'minor', 'major', 'critical']
const paths = []
const issue = {
  severity: 'critical',
  context: {
    type: 'file',
    start: {}
  }
}

for (let x = 1; x <= 3; x++) {
  paths.push(sentencer.make('/src/{{ noun }}.js'))
}

async function main () {
  for (let i = 1; i <= 10; i++) {
    issue.id = String(i)

    issue.name = sentencer.make('{{ noun }}')
    issue.description = sentencer.make('Unexpected {{ noun }} with {{ an_adjective }} {{ noun }}')
    issue.severity = severity[Math.floor(Math.random() * severity.length)]

    issue.context.path = paths[Math.floor(Math.random() * paths.length)]
    issue.context.start.line = Math.floor((Math.random() * 100) + 1)
    issue.context.start.column = Math.floor((Math.random() * 80) + 1)

    process.stdout.write(JSON.stringify(issue))
    process.stdout.write('\0')

    await sleep(150)
  }
}

function sleep (millis) {
  return new Promise(resolve => setTimeout(resolve, millis))
}

main()
