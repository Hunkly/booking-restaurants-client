import React from "react";
import './cafeItem.css'
import {createCafeItem} from "../../App";
import axios from "axios";
import ReservesContainer from '../reserversContainer/reservesContainer'

export default function CafeItem(props) {
    const [toggle, setToggle] = React.useState(false);
    const [bookings, setBookings] = React.useState([]);
    const [editMode, setEditMode] = React.useState(false);
    const [id, setId] = React.useState(props.booking.id);
    const [name, setName] = React.useState(props.booking.name);
    const [address, setAddress] = React.useState(props.booking.address);
    const [desc, setDesc] = React.useState(props.booking.desc);
    const [timeOfWork, setTimeOfWork] = React.useState(props.booking.timeOfWork);
    const [kitchen, setKitchen] = React.useState(props.booking.kitchen);
    const [type, setType] = React.useState(props.booking.type);
    const [foodRestriction, setFoodRestriction] = React.useState(props.booking.foodRestrictions);
    const [price, setPrice] = React.useState(props.booking.price);


    React.useEffect(() => {
        console.log('Забор данных из сервера cafeItem.js');
        getData();
    },[toggle]);

    function getData(){
        axios({
            method: 'get',
            url: 'http://localhost:9000/getData',
            headers: {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                'Accept': 'application/json',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
        .then(res => {
            setBookings(res.data);
        })
        .catch(err => {
        console.log(err);
        })
    }

    return (
        <div>
            {
                editMode ?
                    <div className='App-list-item'>
                        <h3>{props.booking.type}</h3>
                        <div className='App-list__item__row'>
                            <p>{props.booking.id+1}.</p>
                            <input type="text" id='name'  placeholder='Введите название ресторана' value={name} onChange={(e) => { setName(e.target.value) }}/>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Адрес:</b></p>
                            <input type="text" id='address' placeholder='Введите адресс ресторана' value={address} onChange={(e) => { setAddress(e.target.value) }}/>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Описание:</b></p>
                            <input type="text" id='desc' placeholder='Введите описание ресторана' value={desc} onChange={(e) => { setDesc(e.target.value) }}/>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Время работы:</b></p>
                            <input type="text" id='timeOfWork' placeholder='Введите время работы ресторана' value={timeOfWork} onChange={(e) => { setTimeOfWork(e.target.value) }}/>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Кухня:</b> </p>
                            <select name="kitchen" id="kitchen" value={kitchen} onChange={(e) => { setKitchen(e.target.value) }}>
                                <option value="">Выберите кухню</option>
                                <option value="Итальянская кухня">Итальянская кухня</option>
                                <option value="Китайская кухня">Китайская кухня</option>
                                <option value="Русская кухня">Русская кухня</option>
                                <option value="Украинская кухня">Украинская кухня</option>
                            </select>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Тип:</b></p>
                            <select name="type" id="type" value={type} onChange={(e) => { setType(e.target.value) }}>
                                <option value="">Выберите тип заведения</option>
                                <option value="Ресторан">Ресторан</option>
                                <option value="Бар">Бар</option>
                                <option value="Кафе">Кафе</option>
                                <option value="Столовая">Столовая</option>
                                <option value="Закусочная">Закусочная</option>
                            </select>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Ограничения:</b> </p>
                            <select name="foodRestrictions" id="foodRestrictions" value={foodRestriction} onChange={(e) => { setFoodRestriction(e.target.value) }}>
                                <option value="">Выберите пищевые ограничения</option>
                                <option value="Веганы">Веганы</option>
                                <option value="Мясоеды">Мясоеды</option>
                                <option value="Веганы и мясоеды">Веганы и мясоеды</option>
                            </select>
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Цена брони:</b></p>
                            <input type="number" id='price' placeholder='Введите цену брони' value={price} onChange={(e) => { setPrice(e.target.value) }}/>
                        </div>
                        <a onClick={() => {createCafeItem(bookings, toggle, setBookings, setToggle, props.booking.id, name, address, desc, timeOfWork, kitchen, type, foodRestriction, price, props.booking.reserves, 'update', setEditMode)}}>Сохранить</a>
                        <a onClick={() => {setEditMode(false)}}>Отменить</a>
                    </div> :
                    <div className='App-list-item'>
                        <div className='App-list__item__row'>
                            <h3>{type}</h3>
                        </div>
                        <div className='App-list__item__row'>
                            <p>{id+1}.</p> {name}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Адрес:</b></p> {address}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Описание:</b></p> {desc}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Время работы:</b> </p> {timeOfWork}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Кухня:</b></p> {kitchen}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Тип:</b></p> {type}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Ограничения:</b></p> {foodRestriction}
                        </div>
                        <div className='App-list__item__row'>
                            <p><b>Цена брони:</b></p> {price}
                        </div>
                        {
                            props.root ?
                                <div className='App-list__item__row'>
                                    <a onClick={() => {setEditMode(true)}}>Редактировать</a>
                                    <a onClick={() => {props.removeCafeItem(props.chislo)}}>Удалить </a>
                                </div> : null
                        }

                    </div>
            }
            <ReservesContainer root={props.root} booking={props.booking}/>
        </div>
    )
}
