import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../server/configs/firebase';
import Loading from '../components/Loading/Loading'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace('/admin/login'); // Redirect to sign-in page if not authenticated
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();

    }, [router]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;