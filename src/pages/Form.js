import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Form = () => {
    let name = ''; // Используем обычную переменную
    let description = '';
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        name = e.target.value;
        console.log("Текущее значение name:", name);
    };

    const handleDescriptionChange = (e) => {
        description = e.target.value;
        console.log("Текущее значение description:", description);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/items', {name, description})
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Название:
                <input type="text" onChange={handleNameChange} required/>
            </label>
            <br/>
            <label>
                Описание:
                <input type="text" onChange={handleDescriptionChange} required/>
            </label>
            <br/>
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default Form;
