import React, {useRef, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        const loadItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/items/${id}`);
                const itemData = response.data;
                if (nameRef.current) nameRef.current.value = itemData.name || '';
                if (descriptionRef.current) {
                    descriptionRef.current.value = itemData.description || '';
                }
            } catch (error) {
                console.error("Ошибка загрузки:", error);
            }
        };

        loadItem();
    }, [id]);

    // Функция для сохранения изменений
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        };

        axios.put(`http://localhost:5000/items/${id}`, updatedData)
            .then(() => {
                alert("Данные обновлены!");
                navigate('/');
            })
            .catch(error => console.error("Ошибка обновления:", error));
    };

    return (
        <div>
            <h1>Редактирование</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Название:
                    <input type="text" ref={nameRef} required/>
                </label>
                <br/>
                <label>
                    Описание:
                    <textarea ref={descriptionRef} required rows="4" cols="50" />
                </label>
                <br/>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default Detail;
