import React, { useState, useEffect } from 'react';

function Logout(){
    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
//    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [refreshRequired, setRefreshRequired] = useState(false)

    useEffect(() => {
        if (access)
            localStorage.setItem('accessToken', '')
        localStorage.setItem('userId', '')
    }, [refreshRequired])



    return(<div><p style={{color: "black", fontSize: "large", fontWeight: "bold"}} align="center">Вы вышли</p></div>);

}

export default Logout;