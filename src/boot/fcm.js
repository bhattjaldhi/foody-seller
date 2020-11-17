import axios from 'src/services/axios'
import store from 'src/store'
import fcm from 'src/services/modules/firebase'
import FcmBus from 'vue'
import firebase from "firebase";
import "firebase/firestore";

const config = firebase.initializeApp({
  apiKey: "AIzaSyADoTdaJWQbntCVvjlDBSa3iSq6nTVHtnM",
  authDomain: "food-ordering-c3681.firebaseapp.com",
  databaseURL: "https://food-ordering-c3681.firebaseio.com",
  projectId: "food-ordering-c3681",
  storageBucket: "food-ordering-c3681.appspot.com",
  messagingSenderId: "792875295577",
  appId: "1:792875295577:web:b74f7190feffbe044a6248",
  measurementId: "G-DYEBX2QPH1"
});
firebase.analytics();

export {
  firebase
};


export let fcmBus = new FcmBus()

export default ({
  app,
  router,
  store,
  Vue
}) => {

  document.addEventListener("deviceready", async function () {

    updateToken()
    handleTokenRefresh()
    handleBus(store)

    cordova.plugins.firebase.messaging.onMessage(function (payload) {
      store.commit('addToOrders', payload)
      navigator.notification.alert(
        'New order has been arrived', // message
        null, // callback
        'Order', // title
        'Done' // buttonName
      );
      navigator.notification.beep(1);
    });

  }, false);
}


// REGISTER TOKEN TO SERVER AND CREATE GROUP
function handleBus(store) {
  fcmBus.$on('register-token', async function (data) {
    try {
      let token = await getToken()

      // Create or add token
      await fcm(store).createGroup({
        group_name: data.user.id,
        token: token
      })
    } catch (error) {
      console.log(error)
    }
  })
}















// HANDLE TOKEN : ----------------------------------------------------------------------
// HANDLE TOKEN : ----------------------------------------------------------------------
async function updateToken() {
  let token = await getToken()
  localStorage.setItem('fcm', token);


  // Comment: Firebase token
  console.log('FCM-TOKEN: ', token)
}

function getToken() {
  // FCM: get token and store in localstorage 
  return cordova.plugins.firebase.messaging.getToken()
}

function handleTokenRefresh() {
  // FCM: On token refresh
  cordova.plugins.firebase.messaging.onTokenRefresh(async function () {
    console.log("Device token updated");
    updateToken()
  });
}
