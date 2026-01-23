// All-in-one i18n setup (creates instance, loads messages, sets locales)
import { createI18n } from 'vue-i18n';
import Moment from 'moment';
import { warnIfEmptyMessages } from './utils';

// App defaults
const DEFAULT_LANGUAGE_CODE = 'en';

// Create the i18n instance (empty messages; we’ll fill them dynamically)
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE_CODE,
  fallbackLocale: DEFAULT_LANGUAGE_CODE,
  messages: {},
});

async function loadMessagesMap(safeUserLanguageCode, veevaMessages) {
  const veevaMessageMap = veevaMessages.reduce((acc, message) => {
    acc[message.name] = message.text;
    return acc;
  }, {});

  const messages = {
    [safeUserLanguageCode]: veevaMessageMap,
  };

  // Warn early if anything is missing/empty
  warnIfEmptyMessages(safeUserLanguageCode, messages[safeUserLanguageCode]);

  return messages;
}

/**
 * Initializes i18n: fetches messages, registers them, sets active + fallback local code,
 * and syncs Moment's locale code.
 */
export async function initI18n(languageCode = DEFAULT_LANGUAGE_CODE, veevaMessages = []) {
  const messages = await loadMessagesMap(languageCode, veevaMessages);

  // Register all provided locales
  Object.entries(messages).forEach(([languageCode, msgs]) => {
    if (msgs && Object.keys(msgs).length > 0) {
      i18n.global.setLocaleMessage(languageCode, msgs);
    }
  });

  i18n.global.fallbackLocale = DEFAULT_LANGUAGE_CODE;
  i18n.global.locale.value = languageCode;

  // Match Moment to the language
  Moment.locale(languageCode);

  return { activeLanguageCode: languageCode };
}