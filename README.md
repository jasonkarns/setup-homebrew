# setup-homebrew action

[![Test Status](https://img.shields.io/github/workflow/status/jasonkarns/setup-homebrew/Test?label=tests&logo=github)](https://github.com/jasonkarns/setup-homebrew/actions?query=workflow%3ATest)



Sets up homebrew
This action sets up homebrew for use in actions by:
- cloning homebrew
- adding homebrew's bin to PATH
- cloning specified homebrew taps (core tap by default)

## Usage

Refer to [action.yml](action.yml)

### Minimal Example

```yaml
- uses: jasonkarns/setup-homebrew
```

### Specific taps

```yaml
- uses: jasonkarns/setup-homebrew
  with:
    taps: nodenv/nodenv
```
