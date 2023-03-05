import React, { useEffect, useState } from "react";
import LinksForm from './LinksForm'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, query ,setDoc} from "firebase/firestore";


const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const onDeleteLink = async (id) => {
        if (window.confirm('Seguro que desea eliminar?')) {
            console.log(id);
            await deleteDoc(doc(db, "cities", id));
            console.log("borrado")
        }
    }

    const addOrEdit = async (linkObject) => {
        if (currentId === '') {
            await addDoc(collection(db, "cities"), linkObject);
            console.log('newTask added', linkObject.url)
        } else {
            const cityRef = doc(db, 'cities', currentId);
            setDoc(cityRef, linkObject);
            setCurrentId('')
        }
    }


    const obtenerLinks = async () => {
        const q = query(collection(db, "cities"));
        onSnapshot(q, (querySnapshot) => {
            const nombre = [];
            querySnapshot.forEach((doc) => {
                nombre.push({ ...doc.data(), id: doc.id });
                console.log(doc.data().url)
            });
            setLinks(nombre);
        });
    }

    useEffect(() => {
        obtenerLinks();
    },[])

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinksForm {...{ addOrEdit, currentId, links }} />
            </div>
            <div className="col-md-8">
                {links.map(link =>
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h2>{link.name}</h2>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <h5>{link.url}</h5>
                            <p>{link.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Links;