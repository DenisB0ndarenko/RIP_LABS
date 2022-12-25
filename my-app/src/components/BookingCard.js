import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
// import {Link} from 'react-router-dom'
// import {putBooking} from "../myRequests";
import {useDispatch} from "react-redux";
import {fetchBookingsList} from "../store";
//import './MusicCard.css';

const BookingCard = (booking) => {
    //const bookings = useSelector(state => state.bookingsList)
    const [btnLoading, setbtnLoading] = useState(false)
    const dispatch = useDispatch();
    //console.log(bookings)
    console.log(booking);

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        const record_to_delete = booking.id_booking
        console.log(record_to_delete)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({id_booking: booking.id_booking, status: 3, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date})
            //body:JSON.stringify({id_booking: 2, status: 3, quest: 3, user: 2, booking_date: "2023-02-18"})
        }
        console.log({status: 3, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date})
        await fetch(`http://127.0.0.1:8000/bookings/${booking.id_booking}/`, requestOptions)
        dispatch(fetchBookingsList())
        setbtnLoading(false)
    }

    return <Card className="card">
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{booking.id_booking}</Card.Title>
            </div>
            <div  className="textStyle">
                <Card.Text>
                    <div>
                        Квест: {booking.quest.quest_name}
                    </div>
                    <div>
                        Пользователь: {booking.user.username}
                    </div>
                    <div>
                        Статус: {booking.status.status_name}
                    </div>
                    <div>
                        Дата: {booking.booking_date}
                    </div>
                </Card.Text>
            </div>
            <Button variant="secondary"
                    onClick={clickHandler} disabled={btnLoading}>Убрать из корзины</Button>
        </Card.Body>
    </Card>
}

export default BookingCard;