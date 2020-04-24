# setup-homebrew action

[![Test Status](https://img.shields.io/github/workflow/status/jasonkarns/setup-homebrew/Test?label=tests&logo=github)](https://github.com/jasonkarns/setup-homebrew/actions?query=workflow%3ATest)

This action sets up homebrew for use in actions by:
- cloning homebrew
- adding homebrew's bin to PATH
- cloning specified homebrew taps (core tap by default)

Homebrew is already available out of the box on GitHub's macOS runners, so this action is primarily useful for jobs that will run within a build matrix supporting both macOS and Ubuntu. (This action does not support Windows runners.)

setup-homebrew will now leverage the "built-in" version of homebrew on macOS runners unless a `brew-version` is explicitly requested. This is an optimization to avoid cloning a second copy of homebrew when it's already available. However, if you need to ensure homebrew is absolutely at the latest edge version, you may want to run `brew update-reset` after this action completes.

## Usage

Refer to [action.yml](action.yml)

### Minimal Example

```yaml
- uses: jasonkarns/setup-homebrew
- run: brew --version # brew is available!
```

### Specific taps

```yaml
- uses: jasonkarns/setup-homebrew
  with:
    taps: core, nodenv/nodenv
- run: brew tap # outputs homebrew/core and nodenv/nodenv
```
