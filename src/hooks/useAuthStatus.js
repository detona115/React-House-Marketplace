import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    return () => {
        isMounted.current = false;
    }
  }, [isMounted]);

  return { loggedIn, checkingStatus };
};

// Custom hooks that aims to check if the user is logged in or not
// with firebase and returns, stores two states (logged in and checked out)
// to handle the entire process
