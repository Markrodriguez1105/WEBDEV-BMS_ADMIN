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
              primary: colors.blue.lighten4,
              secondary: colors.red.lighten4,
            }
          },
        },
      },
      components: {
        VCalendar,
      },
})
