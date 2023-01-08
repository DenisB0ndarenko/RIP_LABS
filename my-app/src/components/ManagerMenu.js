import {Link} from "react-router-dom";
import React from "react";

function ManagerMenu() {
    return (
            <div className="App">
                <Link to="/add_quest">
                    <button type="button">
                        Добавление квеста
                    </button>
                </Link>
                <Link to="/edit_quest">
                    <button type="button">
                        Изменение квеста
                    </button>
                </Link>
                <Link to="/all_bookings">
                    <button type="button">
                        Просмотр броней
                    </button>
                </Link>
            </div>
    );
}
export default ManagerMenu;