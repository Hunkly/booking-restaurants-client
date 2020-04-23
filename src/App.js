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

export function getUsers(setUsers){
    axios({
        method: 'get',
        url: 'http://localhost:9000/users',
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Origin": 'http://localhost:3000',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
        .then(res => {
            setUsers(res.data);
            console.log('Users', res.data);
        }).catch(err => {
        console.log(err);
    })
}

export default function App() {
    const [toggle, setToggle] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [root, setRoot] = React.useState(false);
    const [pass, setPass] = React.useState('');
    const [user, setUser] = React.useState({});
    const [users, setUsers] = React.useState([]);
    const [viewMode, setViewMode] = React.useState('');
    const [message, setMessage] = React.useState('');
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
        getUsers(setUsers);
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

    function login() {
        let formData;
        if(username && pass) {
            formData = {
                username: username,
                password: pass
            };
            function checkUser(elem){
                console.log('Check user elem: ', elem);
                return elem.username === formData.username && elem.password === formData.password;
            }
            console.log('Users find: ',users.find(checkUser));
            let findResult = users.find(checkUser);
            if(findResult === undefined){
                function checkUsername(elem){
                    console.log('Check userName elem: ', elem);
                    return elem.username === formData.username
                }
                console.log('Username find: ',users.find(checkUsername));
                let findUsername = users.find(checkUsername);
                if(findUsername !== undefined && findUsername.username === formData.username){
                    setMessage('Неверно введёный пароль. Попробуйте снова или введите другой логин, если хотите зарегистрироваться');
                }
                else {
                    users.push(formData);
                    console.log('users', users);
                    axios({
                        method: 'post',
                        url: `http://localhost:9000/login`,
                        data: users,
                        headers: {
                            "Access-Control-Allow-Credentials": true,
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                            "Access-Control-Allow-Origin": 'http://localhost:3000',
                            'Accept': 'application/json',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }
                    })
                        .then(res => {
                            setUsers(res.data);
                            setUser(formData);
                            setViewMode('authorized');
                            console.log('Пользователь добавлен');
                        }).catch(err => {
                        console.log(err);
                    })
                }
            } else {
                if(formData.username === 'admin') setRoot(true);
                setUser(formData);
                console.log('Авторизация прошла успешно');
                setViewMode('authorized');
            }
        } else {
            setMessage('Все поля должны быть заполнены')
        }
    }

  return (
    <div className="App">
        {
        viewMode === 'authorized' ?
    <header className="App-header">
        <h2>Привет, {user.username}</h2>
        {
            root ? <h3>Права администратора</h3> : null
        }
        <div className="App-column-box">
        <div className="App-row-box">
            {
                root ? <div className='App-form'>
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
                </div> : null
            }
          <div className="App-form">
              <h3>Забронировать столик</h3>
              <select name="cafes" id="cafes" value={cafeNumber} onChange={(e) => { setCafeNumber(e.target.value) }}>
                  {
                      bookings.map((booking, index) => {
                          return <option key={booking.id} value={index}>{booking.name}</option>
                      })
                  }
              </select>
              {
                  root ? <input type="text" id='clienName' placeholder='Введите имя клиента' value={clientName} onChange={(e) => { setClientName(e.target.value) }}/> : null
              }
              <input type="datetime-local" id='dateTime' placeholder='Выберите дату и время' value={reserveDatetime} onChange={(e) => { setReserveDatetime(e.target.value) }}/>
              <input type="number" id='table' placeholder='Номер столика' value={table} onChange={(e) => { setTable(e.target.value) }}/>
              {
                  root ? <a onClick={() => {addReserve(cafeNumber, clientName, reserveDatetime, table)}}>Отправить</a> : <a onClick={() => {addReserve(cafeNumber, user.username, reserveDatetime, table)}}>Отправить</a>
              }

          </div>
          <Filter setDisabled={setDisabled} setFilter={setFilter} setBookings={setBookings} getData={getData} bookings={bookings}/>
        </div>

        </div>
        <div className='App-list'>
        {
          bookings.map((booking, index) => {
              return <div key={booking.id}><CafeItem root={root} chislo={index} booking={booking} removeCafeItem={removeCafeItem}/></div>
          })
        }
        </div>
        {
            root ? <div className='App-title'>
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
            </div> : null
        }
        {
            root ?
            <LineChart width={600} height={300} data={bookings}>
                <Line type='monotone' dataKey='reserves.length' stroke='#8884d8'/>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart> : null
        }

    </header> :
    <header className="App-login-header">
        <div className="App-login-form">
            <h1>Войдите в систему</h1>
            <h4>Логин должен быть уникальным. Если вы не авотризированы, достаточно ввести уникальный логин и достаточно сильный пароль для регистрации. Приятного пользования</h4>
            <input type="text" id='username' placeholder='Введите логин' value={username} onChange={(e) => { setUsername(e.target.value) }} />
            <input type="password" id='password' placeholder='Введите пароль' value={pass} onChange={(e) => { setPass(e.target.value) }} />
            <a onClick={() => {login()}}>Отправить</a>
            <p>{message}</p>
        </div>
    </header>
          }

    </div>
  );
}

