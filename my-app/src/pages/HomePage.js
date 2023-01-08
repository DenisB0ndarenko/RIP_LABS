import React from 'react';
import DocumentTitle from 'react-document-title'

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setIsManager, store} from "../store";
import ManagerMenu from "../components/ManagerMenu";
import {Link} from "react-router-dom";
import NewBreadCrumbs from "../components/NewBreadCrumbs";

function HomePage() {

    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [ifManager, setIfManager] = useState(false)
    const isManager = useSelector(state => state.isManager)

    const dispatch = useDispatch();
    useEffect(() => {
        if (access) {
            fetch(
                'http://localhost:8000/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                }
            )
                .then(response => {
                    console.log(response)
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        if (response.status === 401) {
                            throw Error('refresh')
                        }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data, groups}) => {
                    console.log('USER', data)
                    localStorage.setItem('userId', data.id)
                    console.log('GROUPS', groups)
                    console.log(isManager)
                    if(groups.includes('Manager')){
                        setIfManager(true)
                        dispatch(createAction_setIsManager(true))
                        console.log(isManager)
                    }
                    else{
                        setIfManager(false)
                        dispatch(createAction_setIsManager(false))
                    }

                })
                .catch(error => {
                    console.log(`Ошибка:${error.message}`)

                })
        }
    }, [access])

    return (
            <DocumentTitle title = 'MQH'>

                <div>
                    <div className={`container`}>
                        <NewBreadCrumbs props={[
                            {
                                ref: '/',
                                text: 'Home'
                            }
                        ]}/>
                    </div>
                    <p style={{color: "black", fontSize: "large", fontWeight: "bold"}} align="center">Добро пожаловать в MyQuestHub! </p>
                    <p style={{color: "black", fontSize: "large"}} align="center">Окунитесь с головой в мир захватывающих квестов!</p>
                    <p align="center"><img src={`http://localhost:3000/images/home.jpg`} height="300"/></p>
                    <p style={{color: "blue", fontSize: "large", fontWeight: "bold"}} align="center">Меню</p>
                    <div align="center">
                        <Link to="/quests">
                            <button type="button">
                                Квесты
                            </button>
                        </Link>
                    </div>
                    {localStorage.getItem('userId') === '' ? undefined :
                        <div>
                            <div align="center">
                                <Link to="/bookings">
                                    <button type="button">
                                        Мои брони
                                    </button>
                                </Link>
                                <Link to="/logout">
                                    <button type="button">
                                        Выход
                                    </button>
                                </Link>
                            </div>
                            <p></p>
                        </div>
                    }
                    {localStorage.getItem('userId') !== '' ? undefined :
                        <div align="center">
                            <Link to="/reg">
                                <button type="button">
                                    Регистрация
                                </button>
                            </Link>
                            <Link to="/auth">
                                <button type="button">
                                    Вход
                                </button>
                            </Link>
                        </div>
                    }

                    {ifManager&&
                        <p style={{color: "blue", fontSize: "large", fontWeight: "bold"}} align="center">Меню менеджера</p>
                    }
                    {ifManager&&
                        <ManagerMenu />
                    }
                </div>

            </DocumentTitle>

        );
}

export default HomePage;