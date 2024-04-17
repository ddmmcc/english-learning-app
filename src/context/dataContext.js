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

  /**
   * Crea un documento en la coleccion cards-user-[uid] en el que el nombre del documento es item.name
   * @param {*} item 
   */
  const addCard = async (item) => {
    const collectionName = `cards-user-${user.uid}`;
    const docName = item.name.replace(/[^a-zA-Z0-9-_]/g, "");
    
    const db = getFirestore();
    const collectionRef = collection(db, collectionName);

    // Crear documento
    const docRef = doc(collectionRef, docName);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      try {
        // El documento no existe, se crea uno nuevo
        await addDoc(collectionRef, { ...item, id: docRef.id });
        return { status: 'success', msg: 'Documento creado con éxito.' };
      } catch (error) {
        // Manejar error si la creación del documento falla
        console.error("Error al crear el documento:", error);
        return { status: 'error', msg: 'No se pudo crear el documento.' };
      }
    } else {
      // El documento ya existe, no se crea un nuevo documento
      return { status: 'error', msg: 'El documento ya existe.' };
    }
  }

  return (
    <dataContext.Provider
      value={{
        getDocByCollection,
        getDocsIdsByCollection,
        addCard,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}
