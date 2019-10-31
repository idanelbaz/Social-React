import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../store/actions/userActions';
import { Table, Badge } from 'react-bootstrap';


class followers extends Component {

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(getUser());
    if (this.props.user === null || !this.props.user) {
      const { history } = this.props;
      history.push('/signup');
    }
  };
  render() {
    const { user } = this.props;
    return (
      <section className="follow-list">
        {user &&
          <div className="follow-on-user">
            <h1><Badge className="badgeTitle" variant="secondary">You follow on({user.followOn.length} users)</Badge></h1>
            <Table striped bordered hover>
              <thead title="You follow on">
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              {user.followOn.length > 0 &&
                <tbody>
                  {user.followOn.map(user =>
                    <tr key={user._id}>
                      <td>{user.email}</td>
                    </tr>
                  )}
                </tbody>
              }
            </Table>
          </div>
        }
      </section>
    )
  }
}

const mapStateToProps = ({ userReducer }) => {
  const { user } = userReducer;
  return {
    user,
  }
}

export default connect(mapStateToProps)(followers)

