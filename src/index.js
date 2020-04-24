const { execSync } = require('child_process')
const core = require('@actions/core')
const { installHomebrew, installTaps } = require('./installer')

module.exports = run()
module.exports.catch(err => core.setFailed(err.message))

function run () {
  return installHomebrew(core.getInput('brew-version'))
    .then(() => installTaps(core.getInput('taps')))
    .then(() => execSync('brew tap')) // show installed taps
}
