import React, { createContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const FirebaseContext = createContext({})

export default function FirebaseProvider({ children }){
  const [user, setUser] = useState(null)
  const [db, setDb] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const key = import.meta.env.VITE_FIREBASE_API_KEY
    if(!key){ setLoading(false); return }
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const firestore = getFirestore(app)
    setDb(firestore)
    onAuthStateChanged(auth, async (u) => {
      setUser(u)
      setLoading(false)
    })

    // attach helper methods to context by returning them
    FirebaseProvider.signIn = async () => {
      await signInWithPopup(auth, provider)
    }
    FirebaseProvider.signOut = async () => {
      await signOut(auth)
    }
    FirebaseProvider.saveUserData = async (uid, data) => {
      if(!uid) throw new Error('no uid')
      const ref = doc(firestore, 'users', String(uid))
      await setDoc(ref, { data }, { merge: true })
    }
    FirebaseProvider.loadUserData = async (uid) => {
      if(!uid) return null
      const ref = doc(firestore, 'users', String(uid))
      const snap = await getDoc(ref)
      if(!snap.exists()) return null
      return snap.data().data || null
    }
  }, [])
  return <FirebaseContext.Provider value={{user, db, loading, signIn: FirebaseProvider.signIn, signOut: FirebaseProvider.signOut, saveUserData: FirebaseProvider.saveUserData, loadUserData: FirebaseProvider.loadUserData}}>{children}</FirebaseContext.Provider>
}
export { FirebaseContext }
