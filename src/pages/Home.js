import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/items')
            .then(response => setItems(response.data))
            .catch(error => console.error("Ошибка загрузки:", error));
    }, []);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/items/${id}`)
            .then(() => {
                setItems(prev => prev.filter(item => item.id !== id));
            })
            .catch(error => console.error("Ошибка удаления:", error));
    };

    return (
        <div>
            <h1>Список инцидентов</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <Link to={`/detail/${item.id}`}>{item.name}</Link>
                        <button onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px" }}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
            <Link to="/add">Зафиксировать инцидент</Link>
        </div>
    );
};

export default Home;
