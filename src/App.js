import React, { Component } from 'react';
import followers from './views/followers';
import feed from './views/feed';
import Header from './componentes/header';
import addPost from './views/addPost';
import signUp from './views/signUp';
import logIn from './views/logIn';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';



import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">

                <Router>
                    <Header></Header>
                    <Switch>
                        <Route path="/" exact component={feed} />
                        <Route path="/followers" component={followers} />
                        <Route path="/signup" component={signUp} />
                        <Route path="/login" component={logIn} />
                        <Route path="/addpost" component={addPost} />
                    </Switch>
                </Router>
            </div>
        )

    }

}

export default App;