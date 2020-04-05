const core = require('@actions/core')
const { exec } = require('@actions/exec')
const { installHomebrew, installTaps } = require('./installer')

module.exports = run()
module.exports.catch(err => core.setFailed(err.message))

function run () {
  return installHomebrew(core.getInput('brew-version'))
    .then(() => exec('brew help')) // ensures bottled ruby is available
    .then(() => installTaps(core.getInput('taps')))
}
