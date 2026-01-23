// src/i18n-helpers.js
import { ref, computed } from 'vue';
import { i18n } from '@/i18n/setup';

export const locale = i18n.global.locale;

/* -------------------------
   Reactive Translation that allow us to use translations 
   outside vue components like the pinia store
------------------------- */

// cache to avoid recalculating for the same key + locale
const lastKey = ref(null);
const lastParams = ref(null);
const lastLocale = ref(null);
const lastResult = ref('');

// The reactive translation function
export function t(key, params) {
  // computed to track locale automatically
  return computed(() => {
    const currentLocale = locale.value;

    // Only recalc if key, params, or locale changed
    if (
      lastKey.value !== key ||
      JSON.stringify(lastParams.value) !== JSON.stringify(params) ||
      lastLocale.value !== currentLocale
    ) {
      lastKey.value = key;
      lastParams.value = params;
      lastLocale.value = currentLocale;
      lastResult.value = i18n.global.t(key, params);
    }

    return lastResult.value;
  }).value;
}