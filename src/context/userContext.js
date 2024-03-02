import { createContext, useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
// import { app } from "../firebase";
import { useAuth } from "./AuthContext";

const dbContext = createContext();

export const useDb = () => {
  const context = useContext(dbContext);
  if (!context) throw new Error("There is no db provider");
  return context;
};

export function DBProvider({ children }) {
  const { logout, user } = useAuth();
  const [userDetail, setUserDetail] = useState(null);
  const db = getFirestore();

  // const getUserDetail = async (email) => sendPasswordResetEmail(auth, email);
  // const getUserDetail = (email) => ({description: 'hey im the description'});
  // export const getTasks = () => getDocs(collection(db, 'collectionTasks'));
  const getUserDetail = async () => { 
    const uid = user.uid
    const docData = [];
    // return await getDocs(collection(db, 'userDetail'))

    // const q = query(collection(db, "userDetail"), where("uid", "==", uid));
    // debugger;
    // const querySnapshot = await getDocs(q);
    const docRef = doc(db, 'userDetail', uid);
    // getDoc(docRef)
    //   .then((docSnap) => {
    //     if (docSnap.exists()) {
    //       console.log('Document Data', docSnap.data())
    //     }
    //   })

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   const info = { ...doc.data() };
    //   info.docId = doc.id;
    //   //console.log(doc.id, " => ", doc.data());
    //   console.log(info);
    //   docData.push(info);
    // });
    
    // return docData[0];
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }else{
      return {};
    }
  };

  // useEffect(() => {
  //   // const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
  //   //   console.log({ currentUser });
  //   //   setUser(currentUser);
  //   //   setLoading(false);
  //   // });
  //   // return () => unsubuscribe();
  // }, []);

  return (
    <dbContext.Provider
      value={{
        getUserDetail,
      }}
    >
      {children}
    </dbContext.Provider>
  );
}
