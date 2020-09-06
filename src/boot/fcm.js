import axios from 'src/services/axios'
import firebase from 'src/services/modules/firebase'
import FcmBus from 'vue'

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

  }, false);
}


// REGISTER TOKEN TO SERVER AND CREATE GROUP
function handleBus(store) {
  fcmBus.$on('register-token', async function (data) {
    try {
      let token = await getToken()
      
      // Create or add token
      await firebase(store).createGroup({
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
