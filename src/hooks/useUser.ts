import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const [rule, setRule] = useState('guest');
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const { auth } = await import('@/libs/server/firebase');

      const unsubscribe = onAuthStateChanged(auth, user => {
        setUser(user);
        setIsUserLoading(false);
      });

      return () => unsubscribe();
    };

    loadAuth();
  }, []);

  useEffect(() => {
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
  }, [user]);

  return { user, rule, isUserLoading };
};

export default useUser;
