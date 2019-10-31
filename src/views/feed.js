import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, addFollow } from '../store/actions/userActions';
import { getAllPosts, deletePost, filterPosts } from '../store/actions/postsActions';
import PostCard from '../componentes/postCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Badge } from 'react-bootstrap';


class feed extends Component {
    state = {
        filterBy: { title: '' }
    };

    async componentDidMount() {
        const { dispatch } = this.props;
        try {
            await dispatch(getUser());
            if (this.props.user === null) {
                const { history } = this.props;
                history.push('/signup');
            }
            else {
                await dispatch(getAllPosts());
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    deletePost = async (currPostId) => {
        const { dispatch } = this.props;
        await dispatch(deletePost(currPostId));
        await dispatch(getAllPosts());
    }

    followUser = async (userToFollow) => {
        const { dispatch } = this.props;
        try {
            await dispatch(addFollow(userToFollow));
            await dispatch(getUser());
        }
        catch (err) {
            this.notify('Cannot make following');
        }
    }

    handleSearch = async (e) => {
        const { value, name } = e.target;
        await this.setState((state) => ({ filterBy: { ...state.newUser, [name]: value } }));
        const { dispatch } = this.props;
        await dispatch(filterPosts(this.state.filterBy));
    }

    notify = (txt) => toast(txt);

    render() {
        const { user, posts } = this.props;
        const { filterBy } = this.state;
        return (
            <div className="feed">
                <ToastContainer />
                {posts.length > 0 && user !== null &&
                    <input className="titleInput" type="text" name="title" value={filterBy.title} onChange={this.handleSearch} placeholder="Search posts by title"></input>
                }
                {posts.length > 0 && user !== null &&
                    <div className="posts-container">
                        {
                            posts.map(post =>
                                <PostCard deletePost={this.deletePost} followUser={this.followUser} user={user} post={post} key={post._id}></PostCard>
                            )}
                    </div>
                }
                {posts.length === 0 &&
                    <h1><Badge className="badgeTitle" variant="secondary">No posts to show</Badge></h1>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ userReducer, postsReducer }) => {
    const { user } = userReducer;
    const { posts } = postsReducer
    return {
        user,
        posts
    }
}

export default connect(mapStateToProps)(feed)