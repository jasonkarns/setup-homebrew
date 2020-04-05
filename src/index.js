const core = require('@actions/core')
const { installHomebrew } = require('./installer')

function run () {
  return Promise.resolve().then(() =>
    installHomebrew(core.getInput('brew-version'))
  )
}

module.exports = run()
module.exports.catch(err => core.setFailed(err.message))
