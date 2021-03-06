const path = require('path')
const core = require('@actions/core')
const { exec } = require('@actions/exec')
const tools = require('@actions/tool-cache')

const TOOL_NAME = 'homebrew'

module.exports = {
  installHomebrew: async function (version) {
    // If homebrew is already available and a specific version isn't requested
    // just quit early.
    if (version === 'master' && (await homebrewAvailable())) return

    const toolPath = version === 'master' ? gitClone() : toolCache(version)

    // prepend bin directory to PATH for future tasks
    core.addPath(path.join(await toolPath, 'bin'))

    return toolPath
  },

  installTaps: async function (taps) {
    return Promise.all(
      normalizeTapNames(taps).map(t => exec(`brew tap ${t}`))
    )
  }
}

async function homebrewAvailable () {
  return exec('command -v brew').then(
    () => true,
    () => false
  )
}

async function gitClone () {
  const prefix = `${process.env.HOME}/Homebrew`
  await exec(`git clone --depth=1 https://github.com/Homebrew/brew ${prefix}`)
  return prefix
}

async function toolCache (version) {
  return tools.find(TOOL_NAME, version) || downloadHomebrew(version)
}

async function downloadHomebrew (version) {
  return Promise.resolve(
    `https://github.com/Homebrew/brew/archive/${version}.tar.gz`
  )
    .then(url => tools.downloadTool(url))
    .then(tarballPath => tools.extractTar(tarballPath))
    .then(extractedPath => `${extractedPath}/brew-${version}`)
    .then(brewPath => tools.cacheDir(brewPath, TOOL_NAME, version))
}

function normalizeTapNames (taps) {
  return (taps || '')
    .split(',')
    .map(t => t.trim())
    .map(t => (t.match('/') ? t : `homebrew/${t}`))
}
