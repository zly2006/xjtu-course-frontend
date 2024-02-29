import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    $vuetify: {
      calendar: {
        today: 'Today',
      }
    }
  },
  zh: {
    $vuetify: {
      calendar: {
        today: '今天',
      }
    }
  },
}


export const i18n: I18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
})
