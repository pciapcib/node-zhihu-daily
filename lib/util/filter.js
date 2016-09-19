exports.addDateLine = date => [date.slice(0, 4), date.slice(4, 6), date.slice(6)].join('-')

exports.rmDateLine = lineDate => lineDate.split('-').join('')
