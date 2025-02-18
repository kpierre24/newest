// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure you import Vuetify styles

// Import any Vuetify components you want to use
import { VApp, VAppBar, VMain, VContainer, VBtn, VIcon, VCard, VFooter, VImg } from 'vuetify/components';

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VMain,
    VContainer,
    VBtn,
    VIcon,
    VCard,
    VFooter,
    VImg,
  },
  // Add any Vuetify configuration here
});

export default vuetify;
