/**
 * Used in i18n setup. Logs a warning if the given messages object is missing or empty.
 * @param {string} localeCode - The locale code being checked (e.g., "en_US").
 * @param {object} messages - The translations/messages object to validate.
 * @returns {boolean} True if messages are missing or empty, false otherwise.
 */
export function warnIfEmptyMessages(localeCode, messages) {
  if (!messages || Object.keys(messages).length === 0) {
    console.warn(`No translations found for locale "${localeCode}"`);
    return true;
  }
  return false;
}