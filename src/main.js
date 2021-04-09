import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Vue from "vue";
//import "toastr/build/toastr.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyA7Vj7AcuKN1U0unFBEB5ErximXn_ifaxk",
  authDomain: "e-commerce-74842.firebaseapp.com",
  databaseURL:
    "https://e-commerce-74842-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-commerce-74842",
  storageBucket: "e-commerce-74842.appspot.com",
  messagingSenderId: "174892604709",
  appId: "1:174892604709:web:69417043c093f13ecf4ecc",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const firebaseAuth = firebase.auth();
export const groceriesRef = db.ref().child("groceries");
export const usersRef = db.ref().child("Client_Users");
export const receiptsRef = db
  .ref()
  .child("users")
  .child("receipts");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
