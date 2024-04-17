import { useAuth } from "../../context/AuthContext.js";
import { useDb } from "../../context/userContext.js";
import { useData } from "../../context/dataContext.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StandarButton } from "../../components/standar-button/standar-button.js";
import { toast } from 'react-toastify';
import './traduccion.css';

export function Traduccion() {
  const { logout, user } = useAuth();
  const { getUserDetail } = useDb();
  const { getDocByCollection, getDocsIdsByCollection, addCard } = useData();
  const [traduccion, setTraduccion] =  useState([]);
  const [selectedText, setSelectedText] = useState();
  let { capitulo } = useParams();

  const [userDetail, setUserDetail] = useState({
    description: "",
    nick: "",
  });

  const _getUserDetail = async () => {
    const userDetailData = await getUserDetail();
    console.log('userDetailData', userDetailData);
    setUserDetail(userDetailData);
  }

  const _getDoc = async () => {
    const result = await getDocByCollection('subtitles', capitulo);
    const EN = JSON.parse(result.EN)
    const ES = JSON.parse(result.ES);
    setTraduccion({EN, ES})
    
    console.log('doc DBZ_EN by series', result);
  };

  // const _getDocIds = async () => {
  //   const result = await getDocsIdsByCollection('subtitles');
  //   console.log('docIds by series', result);
  // };

  const message = (txt, style) => {
    const types = {
      error: { backgroundColor: "red", color: "white" },
      success: { backgroundColor: "green", color: "white" }
    }
    toast(txt, {
      style: types[style]
    })
  }

  const saveSelection = async () => {
    const selection = window.getSelection();
    if (selection.baseNode.parentElement.classList.contains('en')) {
      const index = selection.baseNode.parentElement.dataset.index;
      const englishPhrase = selection.toString();
      const spanishPhrase = traduccion.ES[index];
      
      if (englishPhrase.length && spanishPhrase.length) {
        setSelectedText({"sentence-en": englishPhrase, "sentence-es": spanishPhrase, name: englishPhrase});
        const result = await addCard({"sentence-en": englishPhrase, "sentence-es": spanishPhrase, name: englishPhrase});
        message(result.msg, result.status)
      }else {
        message('traduccion no valida', 'error')
      }
    }else{
      message('debes seleccionar un texto en ingles', 'error')
    }
  }
  
  useEffect(() => {
    _getUserDetail();
    _getDoc();
    // _getDocIds();
  }, [])

  return (    
    <div className="traduccion">
        <h2>Subtitulos capitulo {capitulo}</h2>
        <button onClick={saveSelection}>Guardar</button>
        {
          (traduccion?.EN || []).map((item, i) => {
              return <div className="traduccion-row" key={i}>
                  <div className='en' data-index={i}>{item}</div>
                  <div className='es'>{traduccion.ES[i]}</div>
                </div>
            })
        }
    </div>  
  );
}
