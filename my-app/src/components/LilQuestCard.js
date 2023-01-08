import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

const LilQuestCard = (quest) => {
    console.log(quest);
    const dateValue = useSelector(state => {
        return state.dateValue;
    })

    const clickHandler = async event => {
        event.preventDefault()
        const quest_to_book = quest.id_quest
        console.log(quest_to_book)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({status: 1, quest: quest_to_book, user: localStorage.getItem('userId'), booking_date: dateValue})
        }
        console.log({status: 1, quest: quest_to_book, user: localStorage.getItem('userId'), booking_date: dateValue})
        await fetch(`http://127.0.0.1:8000/bookings/`, requestOptions)
            .then(function(response) {
                if (response.status === 400) {
                    alert("Неудачный запрос, видимо, квест уже забронирован")
                }
                else alert('Бронь добавлена в список')
            })
    }

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
            {localStorage.getItem('userId') === '' ? undefined :
                <Button variant="success"
                        onClick={clickHandler}>Забронировать</Button>
            }
        </Card.Body>
    </Card>
}

export default LilQuestCard;