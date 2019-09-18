import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown} from 'react-bootstrap';
import { logOut } from '../store/actions/userActions';
import { connect } from 'react-redux';
import { getUser } from '../store/actions/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class header extends Component {

    async componentDidMount() {
        const { dispatch } = this.props
        await dispatch(getUser())
    }

    handleLogOut = async ()=> {
        const { dispatch } = this.props
        await dispatch(logOut())
    };

    notify = (txt) => toast(txt);

    render() {
        return (
            <div className="header">
              <ToastContainer />
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#/"><img width="50px" height="50px" alt="logo" src={require('../imgs/newIcon.svg')}></img> Social React</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#/">Feed</Nav.Link>
                    <Nav.Link href="#followers">Followers</Nav.Link>
                    {
                        this.props.user !== null && 
                    <NavDropdown title={this.props.user.data.email} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#addpost">Add Post</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleLogOut} href="#/" >Log out</NavDropdown.Item>
                    </NavDropdown>
                    }
                    </Nav>
                </Navbar.Collapse>
               </Navbar>
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

export default connect(mapStateToProps)(header)

