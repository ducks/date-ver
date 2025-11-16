const core = require('@actions/core');

/**
 * Validates a Date-Ver version string
 * @param {string} version - Version string to validate
 * @returns {object} - { valid: boolean, error?: string }
 */
function validateDateVer(version) {
  if (!version || typeof version !== 'string') {
    return { valid: false, error: 'Version must be a non-empty string' };
  }

  // Detect separator (if any) - must be consistent throughout
  const separatorMatch = version.match(/[.\-\/]/);
  const separator = separatorMatch ? separatorMatch[0] : null;

  // If separator exists, verify it's used consistently and no empty components
  if (separator) {
    const allSeparators = version.match(/[.\-\/]/g);
    if (!allSeparators.every(s => s === separator)) {
      return { valid: false, error: 'Mixed separators detected. Use one separator consistently throughout the version.' };
    }

    // Check for empty components (consecutive separators)
    const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const emptyComponentRegex = new RegExp(`${escapedSep}${escapedSep}`);
    if (emptyComponentRegex.test(version)) {
      return { valid: false, error: 'Empty components detected. Identifiers must not be empty.' };
    }
  }

  // Strip separator for validation
  const normalized = separator ? version.split(separator).join('') : version;

  // Split into date part and additional identifiers
  const parts = normalized.match(/^(\d{4,8})(.*)$/);
  if (!parts) {
    return { valid: false, error: 'Version must start with a date (YYYY, YYYYMM, or YYYYMMDD)' };
  }

  const datePart = parts[1];
  const identifiers = parts[2];

  // Validate date part length
  if (![4, 6, 8].includes(datePart.length)) {
    return { valid: false, error: 'Date must be YYYY (4 digits), YYYYMM (6 digits), or YYYYMMDD (8 digits)' };
  }

  // Parse date components
  const year = parseInt(datePart.substring(0, 4), 10);
  const month = datePart.length >= 6 ? parseInt(datePart.substring(4, 6), 10) : null;
  const day = datePart.length === 8 ? parseInt(datePart.substring(6, 8), 10) : null;

  // Validate year
  if (year < 1000 || year > 9999) {
    return { valid: false, error: 'Year must be between 1000 and 9999' };
  }

  // Validate month
  if (month !== null && (month < 1 || month > 12)) {
    return { valid: false, error: `Invalid month: ${month}. Month must be between 01 and 12.` };
  }

  // Validate day
  if (day !== null) {
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { valid: false, error: `Invalid day: ${day}. ${year}-${String(month).padStart(2, '0')} has ${daysInMonth} days.` };
    }
  }

  // Validate additional identifiers (if any)
  if (identifiers) {
    // Must be alphanumeric only, no empty components
    if (!/^[a-zA-Z0-9]+$/.test(identifiers)) {
      return { valid: false, error: 'Additional identifiers must be alphanumeric [0-9A-Za-z] only. No hyphens within identifiers, no empty components.' };
    }

    // Check for leading zeros in numeric identifiers
    const numericIdentifiers = identifiers.match(/\d+/g);
    if (numericIdentifiers) {
      for (const num of numericIdentifiers) {
        if (num.length > 1 && num.startsWith('0')) {
          return { valid: false, error: `Numeric identifier ${num} has leading zeros. Numeric identifiers must not contain leading zeros.` };
        }
      }
    }
  }

  return { valid: true };
}

async function run() {
  try {
    const version = core.getInput('version', { required: true });

    core.info(`Validating version: ${version}`);

    const result = validateDateVer(version);

    if (result.valid) {
      core.info(`✓ ${version} is a valid Date-Ver version`);
    } else {
      core.setFailed(`✗ ${version} is not valid Date-Ver: ${result.error}`);
    }
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
