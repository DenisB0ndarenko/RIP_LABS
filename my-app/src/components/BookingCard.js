import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchBookingsList} from "../store";

const BookingCard = (booking) => {
    const [btnLoading, setbtnLoading] = useState(false)
    const dispatch = useDispatch();
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
            body:JSON.stringify({id_booking: booking.id_booking, status: 3, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date,
            close_date: new Date().toISOString().slice(0, 10)})
        }
        await fetch(`http://127.0.0.1:8000/bookings/${booking.id_booking}/`, requestOptions)
        dispatch(fetchBookingsList())
        setbtnLoading(false)
    }

    return <Card className="card">
        <Card.Body>
            <div className="textStyle">
                <Card.Title>Бронь №{booking.id_booking}</Card.Title>
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
                        Дата брони: {booking.booking_date}
                    </div>
                    <div>
                        Дата подачи брони: {booking.in_date}
                    </div>
                    {booking.status.id_status===2 &&
                        <div>
                            Дата принятия брони: {booking.active_date}
                        </div>
                    }
                </Card.Text>
            </div>
            {booking.status.status_name !== "В работе" ? undefined :
                <Button variant="secondary"
                        onClick={clickHandler} disabled={btnLoading}>Отменить бронь</Button>
            }
        </Card.Body>
    </Card>
}

export default BookingCard;