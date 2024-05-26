import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
const vuetify = createVuetify({
  components,
  directives,
});

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faLock,
  faStar,
  faTrash,
  faMoon,
  faPlay,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import { createPinia } from "pinia";
const pinia = createPinia();
/* add icons to the library */
library.add(faLock);
library.add(faTrash);
library.add(faStar);
library.add(faMoon);
library.add(faPlay);
library.add(faPause);
library.add(faStop);
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount("#app");
