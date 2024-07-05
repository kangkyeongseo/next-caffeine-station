import { User } from 'firebase/auth/cordova';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [rule, setRule] = useState<string | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isAuthChangedLoading, setisAuthChangedLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const { auth } = await import('@/libs/server/firebase');

      const unsubscribe = onAuthStateChanged(auth, user => {
        setUser(user);
        setisAuthChangedLoading(false);
      });

      return () => unsubscribe();
    };

    loadAuth();
  }, []);

  useEffect(() => {
    if (isAuthChangedLoading) return;
    if (!user) {
      setRule('guest');
    } else {
      const fetchData = async () => {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('@/libs/server/firebase');

        const docRef = doc(db, 'user', user.uid);
        const docSnap = await getDoc(docRef);
        setRule(docSnap.data()?.rule);
      };
      fetchData();
    }
  }, [user, isAuthChangedLoading]);

  useEffect(() => {
    if (!rule) return;
    setIsUserLoading(false);
  }, [rule]);

  return { user, rule, isUserLoading };
};

export default useUser;
