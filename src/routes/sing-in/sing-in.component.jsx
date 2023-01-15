import { singInWithGooglePopup , createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';



const SingIn = ()=>{
    const logGoogleUser = async() => {
        const {user} = await singInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    return(
        <div>
        <h1>Sing In Page</h1>
        <button onClick={logGoogleUser}>Sing In with Google Popup</button>
        </div>
    );
};

export default SingIn;