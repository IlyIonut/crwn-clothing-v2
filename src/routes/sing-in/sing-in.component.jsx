import { signInWithGoogleRedirect, signInWithGooglePopup , createUserDocumentFromAuth, auth} from '../../utils/firebase/firebase.utils';
import { useEffect, useLayoutEffect} from 'react';
import {getRedirectResult} from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SingIn = ()=>{



    const logGoogleUser = async() => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    
    return(
        <div>
        <h1>Sing In Page</h1>
        <button onClick={logGoogleUser}>Sing In with Google Popup</button>
        <SignUpForm/>
        </div>
    );
};

export default SingIn;