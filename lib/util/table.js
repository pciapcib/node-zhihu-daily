const table = require('text-table')

module.exports = stringArrays =>
  table(stringArrays.map(stringArray => [' '].concat(stringArray)), {
    hsep: ' ',
    align: ['l', 'r']
  })
