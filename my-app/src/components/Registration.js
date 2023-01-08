import React, {Component} from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:null,
            email:null,
            password:null
        }
    }
    componentDidMount(){

    }
    render() {
        const {username, email, password} = this.state;
        const reg=()=>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.state.username, email:this.state.email,
                    password:this.state.password })
            };
            fetch(`http://127.0.0.1:8000/add_user`, requestOptions)
                .then(response => {
                    if (response.ok) {
                        alert('Регистрация успешна')
                    }
                })

            console.log(this.state)
        }
        const update_username_value=(new_username_value)=>{
            this.setState({username:new_username_value});
            console.log(new_username_value);
        }
        const update_email_value=(new_email_value)=>{
            this.setState({email:new_email_value});
            console.log(new_email_value);
        }
        const update_password_value=(new_password_value)=>{
            this.setState({password:new_password_value});
            console.log(new_password_value);
        }
        return (
            <div>
                <p style={{color: "blue", fontSize: "xx-large", fontWeight: "bold"}} align="center">Регистрация</p>
                <div align="center">
                    <form className={"reg_form"}>
                        <input type={"text"} placeholder={"username"} className={"username_input"}
                               value={username}
                               onChange={(event)=>update_username_value(event.target.value)}/>
                        <input type={"text"} placeholder={"email"} className={"email_input"}
                               value={email}
                               onChange={(event)=>update_email_value(event.target.value)}/>
                        <input type={"text"} placeholder={"password"} className={"password_input"}
                               value={password}
                               onChange={(event)=>update_password_value(event.target.value)}/>
                    </form>
                </div>
                <div align="center">
                    <input id="reg_button" className="reg_button" type="submit" value="Зарегистрироваться" onClick={()=>{reg()}}/>
                </div>



            </div>
        );
    }
}

export default Registration;
