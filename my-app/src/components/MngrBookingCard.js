import {Button, Card} from "react-bootstrap";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterBookings} from "../store";

const MngrBookingCard = (booking) => {
    const dispatch = useDispatch();

    const pickedStart = useSelector(state => state.pickedStart)
    const pickedEnd = useSelector(state => state.pickedEnd)
    const pickedStatus = useSelector(state => state.pickedStatus)

    const declineHandler = async () => {
        const record_to_decline = booking.id_booking
        console.log(record_to_decline)
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
            .then(async () => {
                await dispatch(filterBookings({
                    status: pickedStatus,
                    start: pickedStart,
                    end: pickedEnd
                }))
            })
    }


    const acceptHandler = async () => {
        const record_to_accept = booking.id_booking
        console.log(record_to_accept)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({id_booking: booking.id_booking, status: 2, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date,
                active_date: new Date().toISOString().slice(0, 10)})
        }
        await fetch(`http://127.0.0.1:8000/bookings/${booking.id_booking}/`, requestOptions)
            .then(async () => {
                await dispatch(filterBookings({
                    status: pickedStatus,
                    start: pickedStart,
                    end: pickedEnd
                }))
            })
    }


    const back_to_acceptHandler = async () => {
        const record_to_change = booking.id_booking
        console.log(record_to_change)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({id_booking: booking.id_booking, status: 2, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date,
                close_date: null})
        }
        await fetch(`http://127.0.0.1:8000/bookings/${booking.id_booking}/`, requestOptions)
            .then(async () => {
                await dispatch(filterBookings({
                    status: pickedStatus,
                    start: pickedStart,
                    end: pickedEnd
                }))
            })
    }


    const completeHandler = async () => {
        const record_to_complete = booking.id_booking
        console.log(record_to_complete)
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({id_booking: booking.id_booking, status: 4, quest: booking.quest.id_quest, user: booking.user.id, booking_date: booking.booking_date,
                close_date: new Date().toISOString().slice(0, 10)})
        }
        await fetch(`http://127.0.0.1:8000/bookings/${booking.id_booking}/`, requestOptions)
            .then(async () => {
                await dispatch(filterBookings({
                    status: pickedStatus,
                    start: pickedStart,
                    end: pickedEnd
                }))
            })
    }



    return <Card
        style={{backgroundColor:"black", borderColor:"darkblue"}}
    >
        <Card.Body className={'manager_booking'}
        >
            <Card.Title>Бронь №{booking.id_booking}</Card.Title>
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
                Дата запроса брони: {booking.in_date}
            </div>
            <div>
                {booking.status.id_status===1 &&
                    <div>
                        <Button variant="danger"
                                onClick={async ()=>{await declineHandler()}}
                        >Отклонить</Button>{' '}
                        <Button variant="primary"
                                onClick={async ()=>{await acceptHandler()}}
                        >Принять</Button>{' '}
                    </div>
                }

                {booking.status.id_status===2 &&
                    <div>
                        <div>Дата принятия брони: {booking.active_date}</div>
                        <div style={{color: "blue"}}>Бронь принята</div>
                        <Button variant="success"
                                onClick={async ()=>{await completeHandler()}}
                        >Завершить</Button>{' '}
                    </div>
                }

                {booking.status.id_status===3 &&
                    <div>
                        <div>Дата удаления брони: {booking.close_date}</div>
                        <div style={{color: "red"}}>Бронь удалена</div>
                    </div>
                }

                {booking.status.id_status===4 &&
                    <div>
                        <div>Дата завершения брони: {booking.close_date}</div>
                        <div style={{color: "green"}}>Бронь выполнена</div>
                        <Button variant="danger"
                                onClick={async ()=>{await back_to_acceptHandler()}}
                        >Назад</Button>{' '}
                    </div>
                }

            </div>
        </Card.Body>
    </Card>
}

export default MngrBookingCard;