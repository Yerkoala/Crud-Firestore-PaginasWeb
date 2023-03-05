import React, { useState, useEffect } from "react";
import "./form.css"
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

const LinksForm = (props) => {

    const [values, setValues] = useState({
        url: '',
        name: '',
        description: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEdit(values);
        setValues({
            url: '',
            name: '',
            description: ''
        })
    }

    const getLinkById = async (id) => {
        const docRef = doc(db, "cities", id);
        const docSnap = await getDoc(docRef);
        setValues({ ...docSnap.data() })
        console.log(docSnap.data())
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({
                url: '',
                name: '',
                description: ''
            })
        } else {
            getLinkById(props.currentId)
        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="URL" name="url" onChange={handleInputChange} value={values.url} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" placeholder="Nombre sitioWeb" name="name" onChange={handleInputChange} value={values.name} />
            </div>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="Escribe una descripción" onChange={handleInputChange} value={values.description} ></textarea>
            </div>

            <button className="btn btn-primary btn-block">{props.currentId === '' ? 'Guardar' : 'Actualizar'}</button>

        </form>
    )
}

export default LinksForm;