import React from 'react';
// import {Link} from "react-router-dom";
import DocumentTitle from 'react-document-title'




function HomePage() {
    return (
            <DocumentTitle title = 'MQH'>

                <div>
                    <p align="center">Добро пожаловать в MyQuestHub! </p>
                    <p align="center">Окунитесь с головой в мир захватывающих квестов!</p>
                    <p align="center"><img src={`http://localhost:3000/images/home.jpg`} height="300"/></p>
                    <p align="center"><a href="quests/">Квесты</a></p>
                    {localStorage.getItem('userId') === '' ? undefined :
                        <p align="center"><a href="bookings/">Брони</a></p>
                    }
                    {localStorage.getItem('userId') !== '' ? undefined :
                        <p align="center"><a href="reg/">Регистрация</a></p>
                    }
                    {localStorage.getItem('userId') !== '' ? undefined :
                        <p align="center"><a href="auth/">Вход</a></p>
                    }
                    {localStorage.getItem('userId') === '' ? undefined :
                        <p align="center"><a href="logout/">Выход</a></p>
                    }
                </div>

            </DocumentTitle>

        );
}

export default HomePage;