import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllQuestsPage from "./pages/AllQuestsPage";
import "./App.css";
import QuestPage from "./pages/QuestPage";
import MyBreadcrumb from "./components/BreadCrumbsComp";
import Registration from "./components/Registration";
import Auth from "./components/Auth";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage";
import BackButton from "./components/BackButton";
import BookingsPage from "./pages/BookingsPage";

function App() {
  return (
      <BrowserRouter basename="/" >
        <div>
          <Switch>
            <Route exact path="/">
              <MyBreadcrumb />
              <HomePage />
            </Route>
            <Route exact path="/quests/:id_quest/">
              <QuestPage />
              <BackButton />
            </Route>
            <Route exact path="/quests">
              <AllQuestsPage />
              <BackButton />
            </Route>
            <Route exact path="/bookings">
              <BookingsPage />
              <BackButton />
            </Route>
            <Route exact path={'/reg'}>
              <Registration/>
              <BackButton />
            </Route>
            <Route exact path={'/auth'}>
              <Auth/>
              <BackButton />
            </Route>
            <Route exact path={'/logout'}>
              <Logout/>
              <BackButton />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;