import { auth, db } from '@/libs/server/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useUser = () => {
  const [user, setUser] = useState<any | null>(null);
  const [rule, setRule] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsUserLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const docRef = doc(db, 'user', user.uid);
      const docSnap = await getDoc(docRef);
      setRule(docSnap.data()?.rule);
    };
    fetchData();
  }, [user]);

  return { user, rule, isUserLoading };
};

export default useUser;
