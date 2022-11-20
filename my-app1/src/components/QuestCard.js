import {Card} from "react-bootstrap";
import React from "react";
import {Link} from 'react-router-dom'
//import './MusicCard.css';

const QuestCard = (quest) => {
console.log(quest);
    return <Card className="card">
        <Link to={`/quests/${quest.id_quest}`}>
            <Card.Img className="cardImage" variant="top" src={`http://localhost:3000/images/${quest.preview_pic.slice(20)}`} height={300} width={100}/>
        </Link>
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{quest.quest_name}</Card.Title>
            </div>
            <div  className="textStyle">
                <Card.Text>
                    <div>
                        Организатор: {quest.organizer_name}
                    </div>
                    <div>
                        Адрес: {quest.address}
                    </div>
                    <div>
                        Жанр: {quest.genre_name}
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
        </Card.Body>
    </Card>
}

export default QuestCard;