import React from "react";
import './reserveItem.css';

export default function ReserveItem(props){

    return(
        <div key={props.reserve.id} className='App-list__booking-item'>
            <div className='App-list__booking-item__row'>
                <b>Имя: </b><p>{props.reserve.clientName}</p>
            </div>
            <div className='App-list__booking-item__row'>
                <b>Дата и время брони: </b><p>{props.reserve.bookDateTime}</p>
            </div>
            <div className='App-list__booking-item__row'>
                <b>Номер столика: </b><p>{props.reserve.table}</p>
            </div>
            {
                props.root ? <a onClick={() => {props.removeReserveItem(props.index)}}>Удалить </a> : null
            }

        </div>
    )
}
