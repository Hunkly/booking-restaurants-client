import React, {useState} from "react";
import "./filter.css"

export default function Filter(props) {
    const [filter, setFilter] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [kitchen, setKitchen] = React.useState('');
    const [type, setType] = React.useState('');
    const [foodRestriction, setFoodRestriction] = React.useState('');

    function onFilterSelectChange(e){
        setFilter(e.target.value);
        switch(e.target.value) {
            case 'all': {
                props.getData(props.setBookings);
                break;
            }
            case 'italian': {
                let filterArray = props.bookings.filter(
                    element => element.kitchen === "Итальянская кухня"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'china': {
                let filterArray = props.bookings.filter(
                    element => element.kitchen === "Китайская кухня"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'russian': {
                let filterArray = props.bookings.filter(
                    element => element.kitchen === "Русская кухня"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'ukrainian': {
                let filterArray = props.bookings.filter(
                    element => element.kitchen === "Украинская кухня"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'rest': {
                let filterArray = props.bookings.filter(
                    element => element.type === "Ресторан"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'bar': {
                let filterArray = props.bookings.filter(
                    element => element.type === "Бар"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'cafe': {
                let filterArray = props.bookings.filter(
                    element => element.type === "Кафе"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'stol': {
                let filterArray = props.bookings.filter(
                    element => element.type === "Столовая"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'zak': {
                let filterArray = props.bookings.filter(
                    element => element.type === "Закусочная"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'vegan': {
                let filterArray = props.bookings.filter(
                    element => element.foodRestrictions === "Веганы"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'meat': {
                let filterArray = props.bookings.filter(
                    element => element.foodRestrictions === "Мясоеды"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
            case 'vegan&meat': {
                let filterArray = props.bookings.filter(
                    element => element.foodRestrictions === "Веганы и мясоеды"
                );
                props.setBookings(filterArray);
                setDisabled(true);
                props.setDisabled(true);
                break;
            }
        }
    }

    return(
        <div className='App-list__filter-container'>
            <p><b>Фильтр:</b></p>
            <select name="filter" id="filter" value={filter} onChange={ (e) => { onFilterSelectChange(e); props.setFilter(e.target.value)}} disabled={disabled}>
                <option value="">Выберите фильтр</option>
                <option value="all">Показать все</option>
                <option value="kitchen">По кухне</option>
                <option value="type">По типу</option>
                <option value="restriction">По пищевому ограничению</option>
            </select>
            {
                disabled ? <a onClick={() => {props.getData(props.setBookings); props.setDisabled(false); setDisabled(false);}}>Сбросить фильтр</a> : null
            }
            {
                filter === 'all' ?
                    null :
                        filter === 'kitchen' ?
                            <div className='App-list__filter-item'>
                                <select name="kitchen" id="kitchen" value={kitchen} onChange={onFilterSelectChange}>
                                    <option value="">Выберите кухню</option>
                                    <option value="italian">Итальянская кухня</option>
                                    <option value="china">Китайская кухня</option>
                                    <option value="russian">Русская кухня</option>
                                    <option value="ukrainian">Украинская кухня</option>
                                </select>
                            </div> :
                                filter === 'type' ?
                                    <div className='App-list__filter-item'>
                                        <select name="type" id="type" value={type} onChange={onFilterSelectChange}>
                                            <option value="">Выберите тип заведения</option>
                                            <option value="rest">Ресторан</option>
                                            <option value="bar">Бар</option>
                                            <option value="cafe">Кафе</option>
                                            <option value="stol">Столовая</option>
                                            <option value="zak">Закусочная</option>
                                        </select>
                                    </div> :
                                        filter === 'restriction' ?
                                            <div className='App-list__filter-item'>
                                                <select name="foodRestrictions" id="foodRestrictions" value={foodRestriction} onChange={onFilterSelectChange}>
                                                    <option value="">Выберите пищевые ограничения</option>
                                                    <option value="vegan">Веганы</option>
                                                    <option value="meat">Мясоеды</option>
                                                    <option value="vegan&meat">Веганы и мясоеды</option>
                                                </select>
                                            </div> : null
            }
        </div>
    )
}
