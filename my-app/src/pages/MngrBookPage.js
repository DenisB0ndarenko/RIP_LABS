import {useEffect, useState} from "react";
import React from "react";
import {Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {
    createAction_setPickedEnd,
    createAction_setPickedStart,
    createAction_setPickedStatus,
    fetchAllBookings,
    fetchStatuses,
    filterBookings
} from "../store";
import MngrBookingCard from "../components/MngrBookingCard";
import NewBreadCrumbs from "../components/NewBreadCrumbs";
function MngrBookPage() {

    const bookingsList = useSelector(state => {
        return state.bookingsList;
    })
    const statusList = useSelector(state => {
        return state.statusList;
    })

    const pickedStart = useSelector(state => state.pickedStart)
    const pickedEnd = useSelector(state => state.pickedEnd)
    const pickedStatus = useSelector(state => state.pickedStatus)
    const isManager = useSelector(state => state.isManager)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchStatuses())
            await dispatch(fetchAllBookings())
        }
        fetchData()
    }, [])

    const filter_bookings = async event => {
        event.preventDefault();

        await dispatch(filterBookings(
            {
                status: pickedStatus,
                start: pickedStart,
                end: pickedEnd
            }
        ))
    }

    const setDateRange = (start, end)=>{
        console.log(start.format("YYYY-MM-DD"))
        console.log(end.format("YYYY-MM-DD"))
        dispatch(createAction_setPickedStart(start.format("YYYY-MM-DD")))
        dispatch(createAction_setPickedEnd(end.format("YYYY-MM-DD")))
    }

    return (
        <div>
            {isManager?
                <div>
                    <div className={`container`}>
                        <NewBreadCrumbs props={[
                            {
                                ref: '/',
                                text: 'Home'
                            },
                            {
                                ref: '/all_bookings',
                                text: 'All Bookings'
                            }
                        ]}/>
                    </div>
                    <div className="App">
                        <header className="App-header">
                            <h1>Брони</h1>

                            <Form className={'filter_form'} onSubmit={filter_bookings}>
                                <div>
                                    <select name="status_list" id="status_list"
                                            onChange={e=>{
                                                e.preventDefault();
                                                console.log(e.target.value)
                                                dispatch(createAction_setPickedStatus(e.target.value))
                                            }}>
                                        <option value={0}>{'Статус'}</option>
                                        {statusList.map((item, index) => {
                                            return <option key={index}
                                                           value={item.id_status}>{item.status_name} </option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <DateRangePicker
                                        initialSettings={{ startDate: '01/01/2023', endDate: '01/01/2024' }}
                                        onApply={e=>{
                                            e.preventDefault();
                                        }}
                                        onCallback={setDateRange}
                                    >
                                        <button>Выбрать дату</button>
                                    </DateRangePicker>
                                </div>
                                <input type="submit" name="submit" value="Отфильтровать"/>
                            </Form>


                            <Row xs={2} md={3} className={""}>
                                {bookingsList.map((item, index) => {
                                    return (
                                        <Col key={index}>
                                            <MngrBookingCard {...item}/>
                                        </Col>
                                    )
                                })}
                            </Row>

                        </header>
                    </div>
                </div>
                :
                <h1>Функционал недоступен. Войдите с учетной записью менеджера</h1>
            }
        </div>
    );
}
export default MngrBookPage;