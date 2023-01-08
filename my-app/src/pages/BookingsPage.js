import React, {useEffect} from 'react';
import { Col, Row, Spinner} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import {store, fetchBookingsList} from "../store";
import BookingCard from "../components/BookingCard";
import NewBreadCrumbs from "../components/NewBreadCrumbs";

function BookingsPage() {

    const loadingStatus = useSelector(state => {
        return state.loadingStatus;
    })

    const bookingsList = useSelector(state => {
        return state.bookingsList;
    })

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Вывод списка броней');
        dispatch(fetchBookingsList());
    }, [])

    return (
        <>
            <div className={`container`}>
                <NewBreadCrumbs props={[
                    {
                        ref: '/',
                        text: 'Home'
                    },
                    {
                        ref: '/bookings',
                        text: 'Bookings'
                    }
                ]}/>
            </div>
            <p style={{color: "blue", fontSize: "larger", fontWeight: "bold"}}>Развлечение для любой компании!</p>
            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className="loadingBg"><Spinner animation="border"/></div>:
                    <div className={"container"}>
                        {!bookingsList.length ? <h1>К сожалению, пока ничего не найдено. Залогиньтесь снова или забронируйте квест</h1> :
                            <Row md={3} className="g-3">
                                {bookingsList.map((item, index) => {
                                    //console.log(quests)
                                    return (
                                        <Col key={index}>
                                            <BookingCard {...item}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default BookingsPage;