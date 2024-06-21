import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../server/configs/firebase';
import Loading from '../components/Loading/Loading'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const withClientAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
      if(localStorage.getItem("user_info")) return;
      // const unsubscribe = onAuthStateChanged(auth, (user) => {
      //   console.log(user);
        
        
      //   if (!user) {
      //     router.replace('/login-register'); // Redirect to sign-in page if not authenticated
      //   } else {
      //     setLoading(false);
      //   }
      // });

      // return () => unsubscribe();

      
    let {email}=user
    console.log(email,user);
    if (email.length==0) {
          router.replace('/login-register'); // Redirect to sign-in page if not authenticated
        } else {
          setLoading(false);
        }
    
    // email.length>0?console.log('var'):console.log('fonder log ine');

    }, [router,user]);

    
    
    


    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withClientAuth;