import React, {useEffect} from 'react';
import { Col, Row, Spinner} from "react-bootstrap";
import LilQuestCard from "../components/LilQuestCard";
// import { getQuests } from '../myRequests'
import MyBreadcrumb from "../components/BreadCrumbsComp";
import SearchAndFilters from "../components/SearchAndFilters";
import { useSelector, useDispatch } from 'react-redux';
import {store, fetchQuestsList, fetchAllQuestsPageData} from "../store";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import {actionCreator_getQuestsList} from "../store/actionCreators/getQuestsList";
import {actionCreator_setDateValue, createAction_setTextFieldValue, createAction_setSliderValue} from "../store";

function AllQuestsPage() {

    const dateValue = useSelector(state => {
        //console.log("В useSelector %o", state)
        return state.dateValue;
    })


    const loadingStatus = useSelector(state => {
        //console.log("В useSelector %o", state)
        return state.loadingStatus;
    })

    const questsList = useSelector(state => {
        return state.questsList;
    })

    const text_field_value = useSelector(state => state.textFieldValue)
    const quest_pricing = useSelector(state => state.questPricing)
    const slider_value = useSelector(state => state.sliderValue)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Вывод списка квестов');
        //console.log("В useEffect до fetch %o", loadingStatus)
        dispatch(fetchQuestsList());
        dispatch(fetchAllQuestsPageData())
        //console.log("В useEffect после fetch %o", loadingStatus)
    }, [])

    return (
        <>
            <MyBreadcrumb />
            <div>Квесты</div>
            <p style={{color: "blue", fontSize: "larger"}}>Развлечение для любой компании!</p>
            {localStorage.getItem('userId') === '' ? undefined :
                <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата для брони"
                            value={dateValue}
                            onChange={(newValue) => {
                                dispatch(actionCreator_setDateValue(new Date(newValue).toLocaleDateString('en-CA')))
                                //setDateValue(new Date(newValue).toLocaleDateString('en-CA'));
                                console.log(dateValue)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="YYYY-MM-DD"

                        />
                    </LocalizationProvider>
                </div>
            }
            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {/*console.log("Перед loading status ? %o", loadingStatus)*/}
                {/*console.log("Перед loading status2 ? %o", loadingStatus) & */loadingStatus ? <div className="loadingBg"><Spinner animation="border"/></div>:
                    <>
                         {quest_pricing[1] === 0 ? undefined:
                                <SearchAndFilters loading={loadingStatus} text_field_label={"Название квеста"}
                                                       button_title={"Найти"} max={quest_pricing[1]} min={quest_pricing[0]}
                                                       slider_value={slider_value}
                                                       slider_on_change={event => {
                                                           dispatch(createAction_setSliderValue(event.target.value))
                                                       }}
                                                       text_field_value={text_field_value}
                                                       text_field_on_change={event => {
                                                           dispatch(createAction_setTextFieldValue(event.target.value))
                                                       }}
                                                       button_on_click={() => {
                                                           dispatch(fetchQuestsList({
                                                               title: text_field_value,
                                                               min_cost: slider_value[0],
                                                               max_cost: slider_value[1]
                                                           }))
                                                       }}
                                                       slider_marks={[
                                                           {
                                                               value: quest_pricing[0],
                                                               label: `${quest_pricing[0]} ₽`
                                                           },
                                                           {
                                                               value: quest_pricing[1],
                                                               label: `${quest_pricing[1]} ₽`
                                                           }
                                                       ]}
                                />
                         }
                        <div className={"container"}>
                            {/*console.log(questsList)*/}
                            {/*console.log("Перед !questList.length %o", loadingStatus)*/}
                            {!questsList.length ? <h1>К сожалению, пока ничего не найдено :(</h1> :
                                <Row xs={1} md={3} className="g-3">
                                    {questsList.map((item, index) => {
                                        //console.log(quests)
                                        return (
                                            <Col key={index}>
                                                <LilQuestCard {...item}/>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default AllQuestsPage;