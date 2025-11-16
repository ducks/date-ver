# DateVer - Date-Based Versioning Specification

Version numbers based on release dates, not semantic meaning.

## What is DateVer?

DateVer is a versioning specification that uses calendar dates instead of
semantic versioning. Instead of `1.2.3` or `2.0.0`, versions are `20251115`,
`202511`, or `2025`.

## Quick Examples

```
2025          # Released sometime in 2025
202511        # Released in November 2025
20251115      # Released on November 15, 2025
20251115.2    # Second release on November 15, 2025
20251115-beta # Beta release for November 15, 2025
```

## Why DateVer?

- **Automatic**: Version is the release date. No decisions needed.
- **Meaningful**: Users know immediately how fresh the release is.
- **Flexible**: Choose yearly, monthly, or daily granularity.
- **Simple**: No breaking change semantics to track.

## When to Use DateVer

**Good fit:**
- Applications with regular release schedules
- Operating systems and distributions (Ubuntu 24.04)
- Tools where freshness matters more than compatibility
- Internal tools and utilities

**Not a good fit:**
- Libraries with semver expectations
- APIs where compatibility signals matter
- Projects following strict semver contracts

## Read the Spec

See [DATE-VER.md](DATE-VER.md) for the complete specification.

## Projects Using DateVer

- [yaml-janitor](https://github.com/ducks/yaml-janitor) - YAML formatter (YYYYMMDD)
- Ubuntu - Linux distribution (YY.MM with dots)
- Your project here!

## Contributing

Found an issue with the spec? Have suggestions? Open an issue or PR.

## License

Creative Commons - CC BY 4.0
