import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as lab from 'vuetify/labs/components';
import { createVuetify } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { i18n } from './i18n.ts'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import {mdi} from "vuetify/iconsets/mdi";
import {customSVGs} from "@/plugins/customSvgs";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...lab
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
      custom: customSVGs,
    },
  },
})
