# Date Versioning Specification (Date-Ver)

## Summary

Given a version number YEAR, YEAR-MONTH, or YEAR-MONTH-DAY, represent the date when the version was released. Date-Ver uses calendar dates instead of semantic meaning to identify software releases.

## Introduction

In the world of software management, version numbers communicate release ordering and compatibility. Semantic Versioning (SemVer) uses MAJOR.MINOR.PATCH to signal breaking changes and feature additions. Date Versioning (Date-Ver) takes a different approach: version numbers represent when the release happened, not what changed.

Date-Ver is ideal for:
- Projects with time-based release schedules (Ubuntu 24.04, 24.10)
- Applications where "what changed" matters less than "when it was released"
- Systems where users care about freshness over compatibility
- Projects that want automatic, meaningful version numbers

A Date-Ver version number takes the form YYYYMMDD, YYYYMM, or YYYY, allowing projects to choose their preferred granularity.

## Date-Ver Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

1. A Date-Ver version MUST take the form YYYY, YYYYMM, or YYYYMMDD where YYYY is a four-digit year, MM is a two-digit month (01-12), and DD is a two-digit day (01-31). Each component MUST be zero-padded to its full width.

2. Components MAY be separated by a single character separator. If a separator is used, the same separator MUST be used consistently throughout the version. Valid examples: 20251115, 2025.11.15, 2025-11-15, 2025/11/15. Invalid: 2025.11-15 (mixed separators). Versions with different separators are considered equivalent: 20251115 = 2025.11.15 = 2025-11-15.

3. A version using year-only format (YYYY) represents any release in that year. A version using year-month format (YYYYMM) represents any release in that month. A version using year-month-day format (YYYYMMDD) represents a release on that specific day.

4. Versions MUST represent valid dates. Invalid dates like 20251301 (month 13) or 20250231 (February 31) are forbidden.

5. Additional identifiers MAY be appended to the date using the chosen separator. This includes sequence numbers, pre-release identifiers, or build metadata. If no separator was used in the date portion, any separator MAY be chosen for additional identifiers, and that separator MUST be used consistently. Examples: 20251115.1, 20251115.alpha.1, 2025-11-15-rc-2, 2025/11/15/beta/1. Each identifier MUST comprise only ASCII alphanumerics [0-9A-Za-z] and MUST NOT be empty. Numeric identifiers MUST NOT contain leading zeros. Pre-release identifiers have lower precedence than versions without them.

6. Precedence is determined by comparing each component from left to right. More specific versions (with more components) have higher precedence than less specific versions within the same time period. When comparing versions with separators, strip separators first. Examples:
   - 2024 < 2025
   - 202510 < 202511
   - 20251114 < 20251115
   - 2025 < 202501 < 20250101
   - 20251115 < 20251115.1 < 20251115.2
   - 20251115.alpha < 20251115.beta < 20251115
   - 2025.11.15 = 2025-11-15 = 20251115 (equivalent after stripping separators)

7. A project MAY change granularity between releases. A project using YYYY format may switch to YYYYMM or YYYYMMDD at any time. This is valid: 2024 → 202505 → 20250601.

## Why Use Date-Ver?

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

Append identifiers using your chosen separator: 20251115.alpha.1, 2025-11-15-rc-2.

### Should I use Date-Ver or SemVer?

Use SemVer if you need to communicate compatibility (libraries, APIs).
Use Date-Ver if you care about release timing (applications, utilities, distributions).

### Does Date-Ver work with existing tools?

Most version comparison tools sort Date-Ver correctly since it uses lexicographic ordering.

## About

Date-Ver specification authored by Jake Goldsborough.

Inspired by Semantic Versioning and Calendar Versioning.

## License

Creative Commons - CC BY 4.0
https://creativecommons.org/licenses/by/4.0/
