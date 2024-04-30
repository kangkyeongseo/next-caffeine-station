import { auth } from '@/libs/server/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user);
        console.log(user);
        // ...
      } else {
        setUser(null);
        // User is signed out
        // ...
      }
    });
  }, []);

  return { user };
};

export default useUser;
