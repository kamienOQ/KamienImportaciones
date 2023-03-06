import { useState } from "react";

const LinkForm = ( props ) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [ values, setValues ] = useState( initialStateValues );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditLink( values );
        setValues({...initialStateValues});
    };

    return (
        <form className="card card-body" onSubmit={ handleSubmit }>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert-link</i>
                </div>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="https://someurl.com" 
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}>
                </input>
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input 
                    type="text" 
                    className="form-control" 
                    name="name"
                    placeholder="Webside name"
                    onChange={handleInputChange}
                    value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea name="description" rows={3} className="form-control"
                    placeholder="Write a description"
                    onChange={handleInputChange}
                    value={values.description}></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                Save
            </button>
        </form>
    )
};

export default LinkForm;
