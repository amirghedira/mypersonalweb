import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import ProjectDetails from "./Pages/ProjectDetails/ProjectDetails"
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AccountSettings from "./Pages/AccountSettings/AccountSettings"
import IndexHeader from './components/Headers/IndexHeader'
import AppContext from 'context/AppContext';
import DarkFooter from './components/Footers/DarkFooter'
import IndexNavbar from "components/IndexNavbar/IndexNavbar";
import Aboutus from "Pages/Aboutus/Aboutus";
import Topicpage from './Pages/Topicpage/Topicpage'
import Addtopic from "Pages/Addtopic/Addtopic";
import TopicsPage from "./Pages/TopicsPage/TopicsPage";



const App = () => {

    return (
        <AppContext>
            <BrowserRouter>
                <IndexHeader />
                <IndexNavbar />

                <Switch>
                    <Switch>
                        <Route path="/home" render={() => <MainPage />} />

                        <Route
                            path="/amirghedira"
                            render={(props) => <ProfilePage
                                {...props} />}
                        />
                        <Route
                            path="/projects/:id"
                            render={props => <ProjectDetails
                                {...props} />}

                        />
                        <Route
                            path="/settings"
                            render={props => <AccountSettings
                                {...props}
                            />}
                        />
                        <Route
                            path="/aboutus"
                            render={props => <Aboutus {...props} />}
                        />

                        <Route
                            path="/topics/:type"
                            render={props => <TopicsPage {...props} />}
                        />
                        <Route
                            path="/questions/:id"
                            render={props => <Topicpage {...props} />}
                        />
                        <Route
                            path="/suggestions/:id"
                            render={props => <Topicpage {...props} />}
                        />
                        <Route
                            path="/add-topic/:type"
                            render={props => <Addtopic {...props} />}
                        />

                        <Redirect to="/home" />
                        <Redirect from="/" to="/home" />
                    </Switch>
                </Switch>
                <DarkFooter />
            </BrowserRouter >
        </AppContext>
    )


}

export default App;