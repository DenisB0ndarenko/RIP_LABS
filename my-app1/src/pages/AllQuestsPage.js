import React, {useState, useEffect} from 'react';
import { Col, Row, Spinner} from "react-bootstrap";
import LilQuestCard from "../components/LilQuestCard";
// import { getQuests } from '../myRequests'
import MyBreadcrumb from "../components/BreadCrumbsComp";
import { useSelector, useDispatch } from 'react-redux';
import {store, fetchQuestsList} from "../store";
//import {actionCreator_getQuestsList} from "../store/actionCreators/getQuestsList";

function AllQuestsPage() {
    //const [searchValue, setSearchValue] = useState('radiohead');

    //const [loading, setLoading] = useState(true)

    //const [quests, setQuests] = useState([])

    //const [genres, setGenres] = useState([])

    //const [organizers, setOrganizers] = useState([])



/*
    const Loading = async () => {
        await setLoading(true);
        //const {results} = await getQuests();
        await setQuests(await getQuests());
        await console.log(quests);
        await setLoading(false)
    }
*/



    const loadingStatus = useSelector(state => {
        //console.log("В useSelector %o", state)
        return state.loadingStatus;
    })

    const questsList = useSelector(state => {
        return state.questsList;
    })

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('Вывод списка квестов');
        //console.log("В useEffect до fetch %o", loadingStatus)
        dispatch(fetchQuestsList());
        //console.log("В useEffect после fetch %o", loadingStatus)
        // Loading();
    }, [])

    return (
        <>
            <MyBreadcrumb />
            <div>Квесты</div>
            <p style={{color: "blue", fontSize: "larger"}}>Развлечение для любой компании!</p>
            <div className={`container ${loadingStatus && 'containerLoading'}`}>
                {/*console.log("Перед loading status ? %o", loadingStatus)*/}
                {/*console.log("Перед loading status2 ? %o", loadingStatus) & */loadingStatus ? <div className="loadingBg"><Spinner animation="border"/></div>:
                    <div className={"container"}>
                        {/*console.log(questsList)*/}
                        {/*console.log("Перед !questList.length %o", loadingStatus)*/}
                        {!questsList.length ? <h1>К сожалению, пока ничего не найдено :(</h1> :
                            <Row md={3} className="g-3">
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
                }
            </div>
        </>
    );
}

export default AllQuestsPage;