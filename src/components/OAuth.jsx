import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      // signing the user with Google provider
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // retrieving the user instance from firebase
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // if the user doesn't exist create a new on in firestore
      // and navite to '/'
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };
  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
    </div>
  );
}

export default OAuth;
