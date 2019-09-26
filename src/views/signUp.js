import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../store/actions/userActions';
import {Form,Badge} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getUser } from '../store/actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class signup extends Component {

    state = { newUser: {password:'', email:'', followOn:[] } }

    async componentDidMount() {
        const { dispatch } = this.props
        await dispatch(getUser())
        if (this.props.user !== null) {
            const { history } = this.props;
            history.push('/');
        } 
    }     
    


    handleChange = e => {
        const { value, name } = e.target;
        this.setState((state) => ({ newUser: { ...state.newUser, [name]: value } }));
    };

  
    handleSubmit = async e => {
        e.preventDefault();
        const { dispatch } = this.props
        try { 
            await dispatch(signUp(this.state.newUser))  
            const { history } = this.props;
            history.push('/'); 
            }
        catch (err){ 
            this.notify('Cannot do sign up, Email or Password are incorrect, please try again')
            console.log(err);
        } 
    }

    notify = (txt) => toast(txt);

    render() {
        const { newUser } = this.state;
        return (
            <div className="signup">
                <ToastContainer />
                <div className="signup-container">
                    <h1><Badge className="badgeTitle" variant="secondary">Need to sign up</Badge></h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={newUser.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password"  value={newUser.password} onChange={this.handleChange} type="password" placeholder="Password" />
                        </Form.Group>
                        <button>Sign up</button>
                    </Form>
                    <NavLink exact to="/login">
                        Have an account?
                    </NavLink>
                </div>
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

export default connect(mapStateToProps)(signup)