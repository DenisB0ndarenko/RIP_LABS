import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {Col, Row, Spinner} from "react-bootstrap";
import QuestCard from "../components/QuestCard";
import { getQuest } from '../myRequests'
import NewBreadCrumbs from "../components/NewBreadCrumbs";

function QuestPage() {

    const {id_quest} = useParams();

    const [loading, setLoading] = useState(false)

    const [quest, setQuest] = useState([])

    useEffect(() => {
        console.log('Вывод квеста');
        Loading();
    }, [])

    const Loading = async () => {
        await setLoading(true);
        //const {results} = await getQuest(id_quest);
        await setQuest(await getQuest(id_quest));
        //await console.log(quest.quest_name);
        //await console.log(results);
        await setLoading(false)
    }

    return (
        <>
            <div className={`container`}>
                <NewBreadCrumbs props={[
                    {
                        ref: '/',
                        text: 'Home'
                    },
                    {
                        ref: '/quests',
                        text: 'Quests'
                    },
                    {
                        ref: `/quests/${id_quest}`,
                        text: `Quest №${id_quest}`
                    }
                ]}/>
            </div>
            <div><p style={{color: "blue", fontSize: "large", fontWeight: "bold"}}>Подробная информация о квесте №{id_quest} </p></div>
            <div className={`container ${loading && 'containerLoading'}`}>
                {loading ? <div><Spinner animation="border"/></div> :
                    <div className={"container"}>
                        {!quest.id_quest ? <div><h1>К сожалению, в нашем хабе нет такого квеста :(</h1></div>:
                            <>
                                <Row xs={1} md={1} sm={1} lg={"auto"}>
                                    <Col>
                                        <QuestCard {...quest}/>
                                    </Col>
                                </Row>
                            </>
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default QuestPage;