# Date-Ver Validate Action

A GitHub Action that validates version strings against the [Date-Ver specification](https://date-ver.com/).

## Usage

Add this to your workflow file (e.g., `.github/workflows/validate-version.yml`):

```yaml
name: Validate Version
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate Date-Ver
        uses: ducks/date-ver/.github/actions/validate@v1
        with:
          version: '20251116'
```

## Inputs

### `version` (required)

The version string to validate. Can be in any of these formats:

- `20251116` (no separator)
- `2025.11.16` (dots)
- `2025-11-16` (hyphens)
- `2025/11/16` (slashes)
- `20251116.alpha.1` (with identifiers)
- `2025-11-16-rc-2` (pre-release)

## Examples

### Validate a hardcoded version

```yaml
- uses: ducks/date-ver/.github/actions/validate@v1
  with:
    version: '20251116'
```

### Read version from a file

```yaml
- name: Read version
  id: version
  run: echo "value=$(cat VERSION)" >> $GITHUB_OUTPUT

- uses: ducks/date-ver/.github/actions/validate@v1
  with:
    version: ${{ steps.version.outputs.value }}
```

### Validate package.json version

```yaml
- name: Read package.json version
  id: package
  run: echo "version=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT

- uses: ducks/date-ver/.github/actions/validate@v1
  with:
    version: ${{ steps.package.outputs.version }}
```

## What it validates

- Date format (YYYY, YYYYMM, or YYYYMMDD)
- Valid calendar dates (no Feb 31, no month 13, etc.)
- Consistent separator usage (no mixing dots and hyphens)
- Alphanumeric identifiers only
- No empty components
- No leading zeros in numeric identifiers

## License

CC BY 4.0
