import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from 'react-router-dom'
//import './MusicCard.css';

const LilQuestCard = (quest) => {
    console.log(quest);
    return <Card className="card">
        <Link to={`/quests/${quest.id_quest}`}>
            <Card.Img className="cardImage" variant="top" src={`http://localhost:3000/images/${quest.preview_pic.slice(20)}`} height={300} width={100}/>
        </Link>
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{quest.quest_name}</Card.Title>
            </div>
            <div className="textStyle">
                <Card.Text>
                    <div>
                        Адрес: {quest.address}
                    </div>
                    <div>
                        Количество участников: {quest.capacity}
                    </div>
                    <div>
                        Описание: {quest.description}
                    </div>
                    <div>
                        Цена: {quest.price}
                    </div>
                </Card.Text>
            </div>
            <Button className="cardButton" href={`http://localhost:3000/quests/${quest.id_quest}`} variant="primary">Подробнее</Button>
        </Card.Body>
    </Card>
}

export default LilQuestCard;