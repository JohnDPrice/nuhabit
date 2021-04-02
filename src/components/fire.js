import firebase from 'firebase'
import "firebase/auth"

// Your web app's Firebase configuration
const appAuthorization = firebase.initializeApp({
    apiKey: "AIzaSyArBsQN4Isu9BVIHwNFLRPS7Gg_JB3nchw",
    authDomain: "nuhabit-login.firebaseapp.com",
    projectId: "nuhabit-login",
    storageBucket: "nuhabit-login.appspot.com",
    messagingSenderId: "895803824187",
    appId: "1:895803824187:web:7ab16aa104792ed300e41e"
});
  
  export const auth = appAuthorization.auth()

  export default appAuthorization;