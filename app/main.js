import Vue from "nativescript-vue"
import App from "./App"
import Login from "./views/Login"

import store from './store/store'
import * as platform from 'platform'

import DateTimePicker from "nativescript-datetimepicker/vue";
Vue.use(DateTimePicker);

import {getBoolean} from "tns-core-modules/application-settings";

if (platform.isIOS) { 
    GMSServices.provideAPIKey("AIzaSyAaJYHio6ZGvLKJyRxu8gfeupZIq6L45WY");
}

Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)


Vue.registerElement(
  'PullToRefresh',
  () => require('@nstudio/nativescript-pulltorefresh').PullToRefresh
);
Vue.prototype.$store = store
Vue.config.silent = false

var firebase = require("nativescript-plugin-firebase");
firebase.init({
    onAuthStateChanged: data => { // optional but useful to immediately re-logon the user when they re-visit your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if(data.loggedIn){
            console.log("Logged in DAta", data)
        }
    }
    }).then(function () {
        console.log("firebase.init done");
    },function (error) {
        console.log("firebase.init error: " + error);
    }
);

new Vue({
    render: h => h('frame', [h(getBoolean("isLogged")?App:Login)])
}).$start(); 
