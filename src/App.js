import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import CafeItem from "./components/cafeItem/cafeItem";
import Filter from "./components/filter/filter";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export function createCafeItem(bookings, toggle, setBookings, setToggle, id, name, address, desc, timeOfWork, kitchen, type, foodRestriction, price, reserves, mode, setEditMode){
    let formData;
    if(name && address && desc && timeOfWork && kitchen && type && foodRestriction && price) {
        if (mode === 'create') {
            formData = {
                id: id,
                name: name,
                address: address,
                desc: desc,
                timeOfWork: timeOfWork,
                kitchen: kitchen,
                type: type,
                foodRestrictions: foodRestriction,
                price: price,
                reserves: []
            };
        } else {
            formData = {
                id: id,
                name: name,
                address: address,
                desc: desc,
                timeOfWork: timeOfWork,
                kitchen: kitchen,
                type: type,
                foodRestrictions: foodRestriction,
                price: price,
                reserves: reserves
            };
        }
        if (mode === 'create') bookings.push(formData); else bookings.splice(id, 1, formData);
        axios({
            method: 'post',
            url: `http://localhost:9000/setData`,
            data: bookings,
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
                setToggle(!toggle);
                setEditMode(false);
            }).catch(err => {
            console.log(err);
        })
    }
}

export function getData(setBookings){
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
        }).catch(err => {
        console.log(err);
    })
}

export default function App() {
    const [toggle, setToggle] = React.useState(false);
    const [bookings, setBookings] = React.useState([]);
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [timeOfWork, setTimeOfWork] = React.useState('');
    const [kitchen, setKitchen] = React.useState('');
    const [type, setType] = React.useState('');
    const [foodRestriction, setFoodRestriction] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [cafeNumber, setCafeNumber] = React.useState(0)
    const [clientName, setClientName] = React.useState('');
    const [reserveDatetime, setReserveDatetime] = React.useState('');
    const [table, setTable] = React.useState(0);
    const [filter, setFilter] = useState('name');
    const [disabled, setDisabled] = useState(false);

    React.useEffect(() => {
        console.log('Забор данных из сервера App.js');
        getData(setBookings);
    },[toggle]);

    function removeCafeItem(index){
        bookings.splice(index ,1);
        axios({
            method: 'post',
            url: `http://localhost:9000/setData`,
            data: bookings,
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
                setToggle(!toggle);
            }).catch(err => {
            console.log(err);
        })
    }

    function addReserve(cafeNumber, clientName, reserveDatetime, table) {
        console.log(cafeNumber,clientName,reserveDatetime,table);
        if(clientName && reserveDatetime && table) {
            bookings[cafeNumber].reserves.push({clientName: clientName, bookDateTime: reserveDatetime, table: table});
            console.log('CAFES RESERVED', bookings);
            axios({
                method: 'post',
                url: `http://localhost:9000/setData`,
                data: bookings,
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
                    setToggle(!toggle);
                }).catch(err => {
                console.log(err);
            })
        }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <div className="App-column-box">
              <div className="App-row-box">
                  <div className='App-form'>
                      <h3>Добавить заведение</h3>
                      <input type="text" id='name' placeholder='Введите название ресторана' value={name} onChange={(e) => { setName(e.target.value) }} />
                      <input type="text" id='address' placeholder='Введите адресс ресторана' value={address} onChange={(e) => { setAddress(e.target.value) }}/>
                      <input type="text" id='desc' placeholder='Введите описание ресторана' value={desc} onChange={(e) => { setDesc(e.target.value) }}/>
                      <input type="text" id='timeOfWork' placeholder='Введите время работы ресторана' value={timeOfWork} onChange={(e) => { setTimeOfWork(e.target.value) }}/>
                      <select name="kitchen" id="kitchen" value={kitchen} onChange={(e) => { setKitchen(e.target.value) }}>
                          <option value="">Выберите кухню</option>
                          <option value="Итальянская кухня">Итальянская кухня</option>
                          <option value="Китайская кухня">Китайская кухня</option>
                          <option value="Русская кухня">Русская кухня</option>
                          <option value="Украинская кухня">Украинская кухня</option>
                      </select>
                      <select name="type" id="type" value={type} onChange={(e) => { setType(e.target.value) }}>
                          <option value="">Выберите тип заведения</option>
                          <option value="Ресторан">Ресторан</option>
                          <option value="Бар">Бар</option>
                          <option value="Кафе">Кафе</option>
                          <option value="Столовая">Столовая</option>
                          <option value="Закусочная">Закусочная</option>
                      </select>
                      <select name="foodRestrictions" id="foodRestrictions" value={foodRestriction} onChange={(e) => { setFoodRestriction(e.target.value) }}>
                          <option value="">Выберите пищевые ограничения</option>
                          <option value="Веганы">Веганы</option>
                          <option value="Мясоеды">Мясоеды</option>
                          <option value="Веганы и мясоеды">Веганы и мясоеды</option>
                      </select>
                      <input type="number" id='price' placeholder='Введите цену брони' value={price} onChange={(e) => { setPrice(e.target.value) }}/>
                      {
                          disabled ?
                              <a>Сбросьте фильтр перед добавлением заведения</a> :
                              <a onClick={() => {createCafeItem(bookings, toggle, setBookings, setToggle, bookings.length, name, address, desc, timeOfWork, kitchen, type, foodRestriction, price,[], 'create')}}>Отправить</a>
                      }
                      </div>
                  <div className="App-form">
                      <h3>Забронировать столик</h3>
                      <select name="cafes" id="cafes" value={cafeNumber} onChange={(e) => { setCafeNumber(e.target.value) }}>
                          {
                              bookings.map((booking, index) => {
                                  return <option key={booking.id} value={index}>{booking.name}</option>
                              })
                          }
                      </select>
                      <input type="text" id='name' placeholder='Введите имя клиента' value={clientName} onChange={(e) => { setClientName(e.target.value) }}/>
                      <input type="datetime-local" id='dateTime' placeholder='Выберите дату и время' value={reserveDatetime} onChange={(e) => { setReserveDatetime(e.target.value) }}/>
                      <input type="number" id='table' placeholder='Номер столика' value={table} onChange={(e) => { setTable(e.target.value) }}/>
                      <a onClick={() => {addReserve(cafeNumber, clientName, reserveDatetime, table)}}>Отправить</a>
                  </div>
                  <Filter setDisabled={setDisabled} setFilter={setFilter} setBookings={setBookings} getData={getData} bookings={bookings}/>
              </div>

          </div>
          <div className='App-list'>
              {
                  bookings.map((booking, index) => {
                      return <div key={booking.id}><CafeItem chislo={index} booking={booking} removeCafeItem={removeCafeItem}/></div>
                  })
              }
          </div>
          <div className='App-title'>
              <h2>Статистика количества броней в разрезе </h2>
              {
              filter === 'name' ?
                  <h2> имени</h2> :
                  filter === 'kitchen' ?
                      <h2> кухни</h2> :
                      filter === 'type' ?
                          <h2> типа заведений</h2> :
                          <h2> пищевых ограничений</h2>
              }
          </div>

          <LineChart width={600} height={300} data={bookings}>
              <Line type='monotone' dataKey='reserves.length' stroke='#8884d8'/>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
              <XAxis dataKey="name" />
              <YAxis />
          </LineChart>
      </header>
    </div>
  );
}

