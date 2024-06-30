import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { config } from '@vue/test-utils';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

const app = createApp({});
app.use(vuetify);

config.global.plugins = [vuetify];