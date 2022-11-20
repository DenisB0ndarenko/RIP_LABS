import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllQuestsPage from "./pages/AllQuestsPage";
import "./App.css";
import QuestPage from "./pages/QuestPage";
import MyBreadcrumb from "./components/BreadCrumbsComp";

function App() {
    return (
        <BrowserRouter basename="/" >
            <div>
                <Switch>
                    <Route exact path="/">
                        <MyBreadcrumb />
                        <body>
                            <p align="center">Добро пожаловать в MyQuestHub! </p>
                            <p align="center">Окунитесь с головой в мир захватывающих квестов!</p>
                            <p align="center"><img src={`http://localhost:3000/images/home.jpg`} height="300"/></p>
                            <p align="center"><a href="quests/">Квесты</a></p>
                        </body>
                    </Route>
                    <Route exact path="/quests/:id_quest/">
                        <QuestPage />
                    </Route>
                    <Route exact path="/quests">
                        <AllQuestsPage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;