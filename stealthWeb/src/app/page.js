'use client'
import { useEffect, useState } from 'react';
import {app,auth} from './contexts/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth';


// Import the functions you need from the SDKs you need


function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            console.log(currentUser)
              setUser(currentUser);
          } else {
            console.log(currentUser)
              setUser(null);
          }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
  }, []);
  return (
   <main>
    
   </main>
    
  );
}

export default MyApp;
