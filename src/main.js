import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

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
  .mount("#app");
