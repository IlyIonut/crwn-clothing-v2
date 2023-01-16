import { initializeApp } from 'firebase/app';
import {getAuth, signOut ,signInWithRedirect, signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword ,signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
// Your web app's Firebase configuration
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';




const firebaseConfig = {
    apiKey: "AIzaSyBVZqC9JKyxdl2F5AY0G-bLUBp6_YQWrYg",
    authDomain: "crwn-clothing-db-938da.firebaseapp.com",
    projectId: "crwn-clothing-db-938da",
    storageBucket: "crwn-clothing-db-938da.appspot.com",
    messagingSenderId: "236498038838",
    appId: "1:236498038838:web:e9683f8c3ce7aeca4c2897"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth ,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const createAuthWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)

};    
export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);

};   

export const onAuthStateChangedListener = (callback) => {
  
  onAuthStateChanged(auth, callback );

};



export const signOutUser = () =>async()  =>await signOut(auth);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());


    if(!userSnapShot.exists()){
        const{ displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        }catch(error){
            console.log('error creating the user',error.message);
        }
        return userDocRef;
    };

    

    //if user data exist

    //create/set the document with the data from userAuth in my collection
    //return userDocFRef
  }