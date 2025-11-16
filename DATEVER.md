# Date Versioning Specification (DateVer)

## Summary

Given a version number YEAR, YEAR-MONTH, or YEAR-MONTH-DAY, represent the date when the version was released. DateVer uses calendar dates instead of semantic meaning to identify software releases.

## Introduction

In the world of software management, version numbers communicate release ordering and compatibility. Semantic Versioning (SemVer) uses MAJOR.MINOR.PATCH to signal breaking changes and feature additions. Date Versioning (DateVer) takes a different approach: version numbers represent when the release happened, not what changed.

DateVer is ideal for:
- Projects with time-based release schedules (Ubuntu 24.04, 24.10)
- Applications where "what changed" matters less than "when it was released"
- Systems where users care about freshness over compatibility
- Projects that want automatic, meaningful version numbers

A DateVer version number takes the form YYYYMMDD, YYYYMM, or YYYY, allowing projects to choose their preferred granularity.

## DateVer Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

1. A DateVer version MUST take the form YYYY, YYYYMM, or YYYYMMDD where YYYY is a four-digit year, MM is a two-digit month (01-12), and DD is a two-digit day (01-31). Each component MUST be zero-padded to its full width.

2. A version using year-only format (YYYY) represents any release in that year. A version using year-month format (YYYYMM) represents any release in that month. A version using year-month-day format (YYYYMMDD) represents a release on that specific day.

3. Versions MUST represent valid dates. Invalid dates like 20251301 (month 13) or 20250231 (February 31) are forbidden.

4. When a project needs multiple releases within the same time period, a sequence number MAY be appended after a dot. For example: 20251115.1, 20251115.2, 202511.1, 202511.2. The sequence number MUST be a positive integer and MUST NOT contain leading zeros.

5. A pre-release version MAY be denoted by appending a hyphen and a series of dot-separated identifiers immediately following the date or sequence number. Examples: 20251115-alpha, 20251115-beta.1, 20251115.2-rc.3. Identifiers MUST comprise only ASCII alphanumerics and hyphens [0-9A-Za-z-]. Pre-release versions have lower precedence than the associated normal version.

6. Build metadata MAY be denoted by appending a plus sign and a series of dot-separated identifiers immediately following the date, sequence number, or pre-release version. Examples: 20251115+build.123, 20251115.2+exp.sha.5114f85. Build metadata SHOULD be ignored when determining version precedence.

7. Precedence is determined by comparing each component from left to right. More specific versions (with more components) have higher precedence than less specific versions within the same time period. Examples:
   - 2024 < 2025
   - 202510 < 202511
   - 20251114 < 20251115
   - 2025 < 202501 < 20250101
   - 20251115 < 20251115.1 < 20251115.2
   - 20251115-alpha < 20251115-beta < 20251115

8. A project MAY change granularity between releases. A project using YYYY format may switch to YYYYMM or YYYYMMDD at any time. This is valid: 2024 → 202505 → 20250601.

9. Separators like dots, hyphens, or slashes MUST NOT be used within the date portion. These are invalid: 2025.11.15, 2025-11-15, 2025/11/15. The date MUST be continuous digits.

## Why Use DateVer?

**Automatic versioning**: The version number is the release date. No decisions needed.

**Time-based releases**: Projects that ship on schedules (monthly, quarterly, yearly) get meaningful version numbers automatically.

**No breaking change anxiety**: Version numbers don't signal compatibility, reducing pressure to avoid major version bumps.

**Clear freshness**: Users instantly know how old a release is.

## FAQ

### How do I handle timezone differences?

Use UTC for determining the date. Document this in your project.

### What if I release twice on the same day?

Use sequence numbers: 20251115.1, 20251115.2.

### Can I mix granularities?

Yes! A project can use 2024, then 202505, then 20250601. More specific versions are always considered newer within the same period.

### What about pre-releases?

Use the same format as SemVer: 20251115-alpha.1, 20251115-rc.2.

### Should I use DateVer or SemVer?

Use SemVer if you need to communicate compatibility (libraries, APIs).
Use DateVer if you care about release timing (applications, utilities, distributions).

### Does DateVer work with existing tools?

Most version comparison tools sort DateVer correctly since it uses lexicographic ordering. Pre-releases and build metadata follow SemVer conventions.

## About

DateVer specification authored by Jake Goldsborough.

Inspired by Semantic Versioning and Calendar Versioning.

## License

Creative Commons - CC BY 4.0
https://creativecommons.org/licenses/by/4.0/
