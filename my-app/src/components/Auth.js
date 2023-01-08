import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";


function Auth(){
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState()
    const [formUsername, setFormUsername] = useState()
    const [formPassword, setFormPassword] = useState()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState()


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
                .then(({data}) => {
                    setUsername(data.username)
                    setEmail(data.email)
                    setError(null)
                    localStorage.setItem('userId', data.id)

                })
                .catch(error => {
                    console.log(`Ошибка:${error.message}`)
                    if (error.message === 'refresh') {
                        setRefreshRequired(true)
                    } else {
                        console.log(error)
                        setError('Ошибка, подробности в консоли')
                    }
                })
        }
    }, [access])


    useEffect(() => {

        if (refreshRequired) {
            fetch(
                'http://localhost:8000/api/token/refresh',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ refresh })
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({access}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    //localStorage.setItem('refreshToken', refresh)
                    //setRefresh(refresh)
                    setError(null)

                })
                .catch(error => {
                    console.log(error)
                    setError('Информация об ошибке в консоли')
                })
        }
    }, [refreshRequired])


    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        fetch(
            'http://localhost:8000/api/token/obtain',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: formUsername,
                    password: formPassword,
                })
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(({access, refresh}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
            })
            .catch(error => {
                console.log(error)

                setError('Информация об ошибке в консоли')
            })
            .finally(setLoading(false))
    }
    console.log(access)
    return (
        <div className="App">
            {error? <p>{error}</p> : null}
            {!access?
                loading? "Загрузка..." :
                    <div>
                        <p style={{color: "blue", fontSize: "xx-large", fontWeight: "bold"}} align="center">Вход</p>
                        <form className="loginForm" onSubmit={submitHandler}>
                            <input type="text" name="username" value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
                            <input type="password" name="password" value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
                            <input type="submit" name="submit" value="Войти"/>
                        </form>
                    </div>
                :
                !error?
                    <div className="Profile">
                        <p style={{color: "blue", fontSize: "large", fontWeight: "bold"}} align="center">Ваш профиль</p>
                        <h2>{username}</h2>
                        <p>email: {email}</p>
                        <div align="center">
                            <Link to="/logout">
                                <button type="button">
                                    Выйти
                                </button>
                            </Link>
                        </div>

                    </div>


                    :
                    null
            }
        </div>
    );
}



export default Auth;