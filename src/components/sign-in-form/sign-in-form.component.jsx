import { useState} from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth ,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';


const defaultformFields = {

    email:'',
    password:'',

}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const {  email, password} = formFields;
    

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    };

    const signInWithGoogle = async() => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async(event) =>{
        event.preventDefault();

        try{
           const {user} = await signInAuthUserWithEmailAndPassword(email,password);
           resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password': alert('incorect password for email');
                break
                case 'auth/user-not-found' : alert('no user associated with this email');
                break
                defauld: 
                console.log(error);
            }
        }
    }

    const handleChange = (event) => {
        const {name , value} = event.target;
        setFormFields ({...formFields, [name]:value});
    };



    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sing in with your email and password</span>
            <form onSubmit={handleSubmit}>    
                <FormInput label="Email" type = "email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type = "password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                <Button  type = "submit">Sing In</Button>
                <Button  type="button" buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;