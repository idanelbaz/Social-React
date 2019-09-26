import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, getUser } from '../store/actions/userActions';
import {Form,Badge} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class login extends Component {

    state = { user: {password:'', email:''} }

    async componentDidMount() {

    }


    handleChange = e => {
        const { value, name } = e.target;
        this.setState((state) => ({ user: { ...state.user, [name]: value } }));
    };

  
    handleSubmit = async e => {
        e.preventDefault();
        const { dispatch } = this.props
        try { 
        await dispatch(logIn(this.state.user))
        await dispatch(getUser())
        if(this.props.user === null || !this.props.user) { 
            this.notify('Email or Password are incorrect, please try again')
        }
        else { 
            const { history } = this.props;
            history.push('/'); 
        }

        }
        catch(err){ 
            this.notify('Email or Password are incorrect, please try again')
        }      
    };

    notify = (txt) => toast(txt);

    render() {
        const { user } = this.state;
        return (
            <div className="login">
                <ToastContainer />
                <div className="login-container">
                    <h1><Badge className="badgeTitle" variant="secondary">Welcome</Badge></h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={user.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password"  value={user.password} onChange={this.handleChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <button>Login</button>
                    </Form>
                </div>
                <NavLink exact to="/signup">
                    Don't got an account yet? 
                </NavLink>
            </div>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    const { user } = userReducer;

    return {
        user
    }
}

export default connect(mapStateToProps)(login)