import "./assets/main.css";
import './assets/tailwind.css';
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import router from './router'
import { DataStore } from '@aws-amplify/datastore';


Amplify.configure(outputs);

const app = createApp(App);
app.use(router);

async function initializeApp() {
    try {
        await DataStore.start();
        console.log('DataStore initialized successfully');
    } catch (error) {
        console.error('Error initializing DataStore:', error);
    }

    app.mount("#app");
}

initializeApp();
