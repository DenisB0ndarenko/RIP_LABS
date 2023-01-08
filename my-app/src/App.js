import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllQuestsPage from "./pages/AllQuestsPage";
import "./App.css";
import QuestPage from "./pages/QuestPage";
import Registration from "./components/Registration";
import Auth from "./components/Auth";
import Logout from "./components/Logout";
import HomePage from "./pages/HomePage";
import BackButton from "./components/BackButton";
import BookingsPage from "./pages/BookingsPage";
import AddQuestPage from "./pages/AddQuestPage";
import EditQuestPage from "./pages/EditQuestPage";
import MngrBookPage from "./pages/MngrBookPage";

function App() {
  return (
      <BrowserRouter basename="/" >
        <div>
          <Switch>
            <Route exact path="/">
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
            <Route exact path={'/add_quest'}>
              <AddQuestPage />
              <BackButton />
            </Route>
            <Route exact path={'/edit_quest'}>
              <EditQuestPage />
              <BackButton />
            </Route>
            <Route exact path={'/all_bookings'}>
              <MngrBookPage />
              <BackButton />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;