# setup-homebrew action

[![Test Status](https://img.shields.io/github/workflow/status/jasonkarns/setup-homebrew/Test?label=tests&logo=github)](https://github.com/jasonkarns/setup-homebrew/actions?query=workflow%3ATest)

This action sets up homebrew for use in actions by:
- cloning homebrew
- adding homebrew's bin to PATH
- cloning specified homebrew taps (core tap by default)

Homebrew is already available out of the box on GitHub's macOS runners, so this action is primarily useful for jobs that will run within a build matrix supporting both macOS and Ubuntu. (This action does not support Windows runners.)

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
