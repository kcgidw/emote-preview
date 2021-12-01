import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitch, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTwitch);
library.add(faDiscord);
library.add(faImage);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
