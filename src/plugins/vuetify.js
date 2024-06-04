/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'
import { VCalendar } from 'vuetify/labs/VCalendar'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    iconFont: 'Poppins',
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.indigo.darken1,
              primary_light: colors.indigo.lighten3,
              secondary: colors.red.darken1,
              teriary: colors.green.darken1,
              disable: colors.grey.lighten3,
            }
          },
        },
      },
      components: {
        VCalendar,
      },
})
