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

const dataContext = createContext();

export const useData = () => {
  const context = useContext(dataContext);
  if (!context) throw new Error("There is no db provider");
  return context;
};

export function DataProvider({ children }) {
  const { logout, user } = useAuth();
  const db = getFirestore();

  const getDocByCollection = async (collectionName, docName) => { 
    const uid = user.uid
    const docData = [];

    const docRef = doc(db, collectionName, docName);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }else{
      return {};
    }
  };

  const getDocsIdsByCollection = async (collectionName) => {
    const db = getFirestore();
    const collectionRef = collection(db, collectionName);
    const _querySnapshot = await getDocs(collectionRef);
    const docIds = _querySnapshot.docs.map(doc => {
      return doc.id
    });
    return docIds;
  }

  return (
    <dataContext.Provider
      value={{
        getDocByCollection,
        getDocsIdsByCollection
      }}
    >
      {children}
    </dataContext.Provider>
  );
}
