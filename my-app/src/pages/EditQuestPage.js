import {useEffect, useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGenresList, fetchOrganizersList, fetchQuestsListma} from "../store";
import NewBreadCrumbs from "../components/NewBreadCrumbs";

function EditQuestPage() {

    const [currQuest, setCurrQuest] = useState()

    const [formName, setFormName] = useState()
    const [formOrganizer, setFormOrganizer] = useState({id_organizer: 0, organizer_name: 'Организатор'})
    const [formAddress, setFormAddress] = useState('')
    const [formGenre, setFormGenre] = useState({id_genre: 0, genre_name: 'Жанр'})
    const [formCapacity, setFormCapacity] = useState()
    const [formDescription, setFormDescription] = useState('')
    const [formPreviewPic, setFormPreviewPic] = useState('')
    const [formPrice, setFormPrice] = useState()

    const genresList = useSelector(state => state.genresList)
    const organizersList = useSelector(state => state.organizersList)
    const questsList = useSelector(state => state.questsList)
    const isManager = useSelector(state => state.isManager)
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchGenresList())
            dispatch(fetchOrganizersList())
            dispatch(fetchQuestsListma({ma: true}))
        }
        fetchData()
    }, [])


    const edit_quest = async event => {
        event.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({id_quest: currQuest.id_quest, quest_name: formName, organizer: formOrganizer.id_organizer, address: formAddress,
                genre: formGenre.id_genre, capacity: formCapacity, description: formDescription, preview_pic: formPreviewPic,
                price: formPrice})
        }
        console.log({id_quest: currQuest.id_quest, quest_name: formName, organizer: formOrganizer.organizer, address: formAddress,
            genre: formGenre.genre, capacity: formCapacity, description: formDescription, preview_pic: formPreviewPic,
            price: formPrice})
        await fetch(`http://127.0.0.1:8000/quests/${currQuest.id_quest}/`, requestOptions)
            .then(function(response) {
                if (response.status === 400) {
                    alert("Неудачный запрос, видимо не введены важные данные")
                }
                else {
                    alert("Квест изменен")
                    dispatch(fetchQuestsListma({ma: true}))
                }
            })
    }

    const delete_quest = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        await fetch(`http://127.0.0.1:8000/quests/${currQuest.id_quest}`, requestOptions)
            .then(function(response) {
                if (response.status === 400) {
                    alert("Неудачный запрос, что-то пошло не так")
                }
                else {
                    alert("Квест удален")
                    dispatch(fetchQuestsListma({ma: true}))
                }
            })
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
                                ref: '/edit_quest',
                                text: 'Editing Quest'
                            }
                        ]}/>
                    </div>

                    <div className="App">
                        <header className="App-header">
                            <h1>Изменение квеста</h1>
                            <div className={'formWrapper'}>

                                <form className="EditForm" onSubmit={edit_quest}>
                                    <div>
                                        <select name="quests_list" id="quests_list"
                                                onChange={e=>{
                                                    e.preventDefault();
                                                    let pickedQuest=JSON.parse(e.target.value)
                                                    console.log(e.target.value)
                                                    if(pickedQuest!==0){
                                                        setCurrQuest(pickedQuest)
                                                        setFormName(pickedQuest.quest_name)
                                                        setFormOrganizer(pickedQuest.organizer)
                                                        setFormAddress(pickedQuest.address)
                                                        setFormGenre(pickedQuest.genre)
                                                        console.log(formGenre)
                                                        setFormCapacity(pickedQuest.capacity)
                                                        setFormDescription(pickedQuest.description)
                                                        setFormPreviewPic(pickedQuest.preview_pic)
                                                        setFormPrice(pickedQuest.price)
                                                    }
                                                }}>
                                            <option value={0}>{'Квест'}</option>
                                            {questsList.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.quest_name} </option>
                                            })}
                                        </select>
                                    </div>


                                    <div>
                                        <input type="text" name="quest_name" value={formName}
                                               onChange={e => setFormName(e.target.value)} placeholder="Название квеста"/>
                                    </div>
                                    <div>
                                        <select name="genres_list" id="genres_list"
                                                value={formGenre}
                                                onChange={e => {
                                                    e.preventDefault();
                                                    let newGenreName = JSON.parse(e.target.value)
                                                    console.log(e.target.value)
                                                    if (newGenreName.id_genre !== 0) {
                                                        setFormGenre(newGenreName)
                                                        console.log(formGenre)
                                                    }
                                                }}>
                                            <option value={formGenre.id_genre}>{formGenre.genre_name}</option>
                                            {genresList.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.genre_name} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <select name="organizers_list" id="organizers_list"
                                                value={formOrganizer}
                                                onChange={e => {
                                                    e.preventDefault();
                                                    let newOrganizerName = JSON.parse(e.target.value)
                                                    console.log(e.target.value)
                                                    if (newOrganizerName.id_organizer !== 0) {
                                                        setFormOrganizer(newOrganizerName)
                                                    }
                                                }}>
                                            <option value={formOrganizer.id_organizer}>{formOrganizer.organizer_name}</option>
                                            {organizersList.map((item, index) => {
                                                return <option key={index}
                                                               value={JSON.stringify(item)}>{item.organizer_name} </option>
                                            })}
                                        </select>
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

                                    <input type="submit" name="submit" value="Изменить"/>
                                    <input type="button" name="delete_button" value="Удалить" onClick={delete_quest}/>


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
export default EditQuestPage;