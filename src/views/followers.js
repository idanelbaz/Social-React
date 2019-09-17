import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserFollowOn, getFollowersOfUser} from '../store/actions/followAction';
import {getUser} from '../store/actions/userActions'
import {Table,Badge} from 'react-bootstrap';






 class followers extends Component {

    async componentDidMount() {
        const { dispatch } = this.props
        await dispatch(getUser())
        if (this.props.user === null) {
            const { history } = this.props;
            history.push('/signup');
        }
        else { 
          try { 
            await dispatch(getUserFollowOn())
            await dispatch(getFollowersOfUser())
          }
          catch { 
              console.log('ERROR');
          }
        }
    }
    render() {
        const {userFollowOn} = this.props;
        const {followersOfUser} = this.props;
        return (
            <section className="follow-list">
              {userFollowOn &&
                 <div className="follow-on-user">
                    <h1><Badge className="badgeTitle" variant="secondary">You follow on({userFollowOn.length})</Badge></h1>
                    <Table striped bordered hover>
                      <thead title="You follow on">
                        <tr>
                          <th>User Id</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userFollowOn.length>1 &&
                        <tr>
                          <td>{userFollowOn[0].f_user_id}</td>
                          <td>{userFollowOn[0].email}</td>
                        </tr>
                        }
                         {userFollowOn.length<1 &&
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                        }
                      </tbody>
                  </Table>
                  </div>
              }
               {followersOfUser &&
                 <div className="user-follow-on">
                    <h1><Badge className="badgeTitle" variant="secondary">Your followers({followersOfUser.length})</Badge></h1>
                    <Table striped bordered hover>
                      <thead title="Following you">
                        <tr>
                          <th>User Id</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {followersOfUser.map(user =>
                          <tr key={user.f_user_id}>
                            <td>{user.f_user_id}</td>
                            <td>{user.email}</td>
                          </tr>
                  )}  
                      </tbody>
                    </Table>
                 </div>
               }      
            </section>
        )
    }
}

const mapStateToProps = ({userReducer, followReducer}) => { 
    const { user } = userReducer;
    const {followersOfUser, userFollowOn} = followReducer;
  
    return {
     user,
     followersOfUser,
     userFollowOn
    }
  }
  
  export default connect(mapStateToProps)(followers)

