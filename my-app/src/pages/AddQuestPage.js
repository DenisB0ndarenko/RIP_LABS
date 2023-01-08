import {useEffect, useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGenresList, fetchOrganizersList} from "../store";
import NewBreadCrumbs from "../components/NewBreadCrumbs";


function AddQuestPage() {

    const [formName, setFormName] = useState()
    const [formOrganizer, setFormOrganizer] = useState()
    const [formAddress, setFormAddress] = useState('')
    const [formGenre, setFormGenre] = useState()
    const [formCapacity, setFormCapacity] = useState()
    const [formDescription, setFormDescription] = useState('')
    const [formPreviewPic, setFormPreviewPic] = useState('')
    const [formPrice, setFormPrice] = useState()

    const genresList = useSelector(state => state.genresList)
    const organizersList = useSelector(state => state.organizersList)
    const isManager = useSelector(state => state.isManager)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Вывод списка жанров")
        dispatch(fetchGenresList())
        dispatch(fetchOrganizersList())
        console.log(genresList)
    }, [])


    const add_quest = async event => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({quest_name: formName, organizer: formOrganizer.id_organizer, address: formAddress,
                genre: formGenre.id_genre, capacity: formCapacity, description: formDescription, preview_pic: formPreviewPic,
                price: formPrice})
        }
        console.log({quest_name: formName, organizer: formOrganizer.organizer, address: formAddress,
            genre: formGenre.genre, capacity: formCapacity, description: formDescription, preview_pic: formPreviewPic,
            price: formPrice})
        await fetch(`http://127.0.0.1:8000/quests/`, requestOptions)
            .then(function(response) {
                if (response.status === 400) {
                    alert("Неудачный запрос, видимо не введены важные данные")
                }
                else {
                    alert("Квест добавлен")
                    setFormName('')
                    setFormAddress('')
                    setFormCapacity(1)
                    setFormDescription('')
                    setFormPreviewPic('')
                    setFormPrice(0)
                }
            })
    }

    return (
        <div>
            {isManager ?
                <div>
                    <div className={`container`}>
                        <NewBreadCrumbs props={[
                            {
                                ref: '/',
                                text: 'Home'
                            },
                            {
                                ref: '/add_quest',
                                text: 'Adding Quest'
                            }
                        ]}/>
                    </div>

                    <div className="App">
                        <header className="App-header">
                            <h1>Добавление квеста</h1>
                            <div className={'formWrapper'}>
                                <form className="EditForm" onSubmit={add_quest}>

                                    <div>
                                        <select name="genres_list" id="genres_list"
                                                onChange={e => {
                                                    e.preventDefault();
                                                    let newGenreName = e.target.value
                                                    console.log(e.target.value)
                                                    if (newGenreName !== 0) {
                                                        setFormGenre(JSON.parse(newGenreName))
                                                        console.log(formGenre)
                                                    }
                                                }}>
                                            <option value={0}>{'Жанр'}</option>
                                            {genresList.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.genre_name} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <select name="organizers_list" id="organizers_list"
                                                onChange={e => {
                                                    e.preventDefault();
                                                    let newOrganizerName = e.target.value
                                                    console.log(e.target.value)
                                                    if (newOrganizerName !== 0) {
                                                        setFormOrganizer(JSON.parse(newOrganizerName))
                                                    }
                                                }}>
                                            <option value={0}>{'Организатор'}</option>
                                            {organizersList.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.organizer_name} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name="quest_name" value={formName}
                                               onChange={e => setFormName(e.target.value)}
                                               placeholder="Название квеста"/>
                                    </div>
                                    <div>
                                        <input type="text" name="address" value={formAddress}
                                               onChange={e => setFormAddress(e.target.value)}
                                               placeholder="Адрес"/>
                                    </div>
                                    <div>
                                        <input type="number" name="capacity" value={formCapacity} min={1}
                                               onChange={e => setFormCapacity(e.target.value)} placeholder="Кол-во участников"/>
                                    </div>
                                    <div>
                                        <input type="text" name="description" value={formDescription}
                                               onChange={e => setFormDescription(e.target.value)} placeholder="Описание"/>
                                    </div>
                                    <div>
                                        <input type="text" name="preview_pic" value={formPreviewPic}
                                               onChange={e => setFormPreviewPic(e.target.value)}
                                               placeholder="Картинка"/>
                                    </div>
                                    <div>
                                        <input type="number" name="price" value={formPrice} min={0}
                                               onChange={e => setFormPrice(e.target.value)} placeholder="Цена"/>
                                    </div>

                                    <input type="submit" name="submit" value="Добавить"/>
                                </form>
                            </div>

                        </header>
                    </div>
                </div>
                :
                <h1>Функционал недоступен. Войдите с учетной записью менеджера.</h1>
            }
        </div>
    );
}
export default AddQuestPage;