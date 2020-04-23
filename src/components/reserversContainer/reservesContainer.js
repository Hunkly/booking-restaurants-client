import React from "react";
import './reservesContainer.css'
import ReserveItem from "./reserveItem/reserveItem";
import axios from "axios";

export default function ReservesContainer(props){
    const [bookings, setBookings] = React.useState([]);
    const [toggle, setToggle] = React.useState(false);

    React.useEffect(() => {
        console.log('Забор данных из сервера reservesContainer.js');
        getData();
        console.log('Брони:', props.booking.reserves);
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

    function removeReserveItem(index){
        console.log('ID', index);
        props.booking.reserves.splice(index ,1);
        console.log('Reserves array with removed item', props.booking.reserves);
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

    return (
        <div className='App-list__booking-container'>
            <b>Текущие брони:</b>
            { props.booking.reserves.length !== 0 ? props.booking.reserves.map((reserve, index) => {
                return <ReserveItem root={props.root} reserve={reserve} index={index} removeReserveItem={removeReserveItem} />
            }) : <p>Броней нет</p> }
        </div>
    )
}
