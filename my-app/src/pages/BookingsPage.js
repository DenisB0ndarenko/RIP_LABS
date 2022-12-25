import React, {useEffect} from 'react';
import { Col, Row, Spinner} from "react-bootstrap";
// import { getQuests } from '../myRequests'
import MyBreadcrumb from "../components/BreadCrumbsComp";
import { useSelector, useDispatch } from 'react-redux';
import {store, fetchBookingsList} from "../store";
import BookingCard from "../components/BookingCard";
//import {actionCreator_getQuestsList} from "../store/actionCreators/getQuestsList";

function BookingsPage() {

    const loadingStatus = useSelector(state => {
        //console.log("В useSelector %o", state)
        return state.loadingStatus;
    })

    const bookingsList = useSelector(state => {
        return state.bookingsList;
    })

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Вывод списка броней');
        //console.log("В useEffect до fetch %o", loadingStatus)
        dispatch(fetchBookingsList());
        //console.log("В useEffect после fetch %o", loadingStatus)
        // Loading();
    }, [])

    return (
        <>
            <MyBreadcrumb />
            <div>Брони</div>
            <p style={{color: "blue", fontSize: "larger"}}>Развлечение для любой компании!</p>
            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {/*console.log("Перед loading status ? %o", loadingStatus)*/}
                {/*console.log("Перед loading status2 ? %o", loadingStatus) & */loadingStatus ? <div className="loadingBg"><Spinner animation="border"/></div>:
                    <div className={"container"}>
                        {/*console.log(questsList)*/}
                        {/*console.log("Перед !questList.length %o", loadingStatus)*/}
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