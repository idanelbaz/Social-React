import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/postsActions';
import { getUser } from '../store/actions/userActions';
import {Badge} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class addNewPost extends Component {
    state = {
        postToUpload: {title:'', image_url:'', userId:'' , userEmail: ''},
    };

    async componentDidMount() {
        const { dispatch } = this.props
        try {
            await dispatch(getUser())
        if (this.props.user === null || !this.props.user) {
            const { history } = this.props;
            history.push('/signup');
        }
        }
        catch(err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState((state) => ({ postToUpload: { ...state.postToUpload, [name]: value } }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState((state) => ({ postToUpload: { ...state.postToUpload, userId: this.props.user._id } }));
        await this.setState((state) => ({ postToUpload: { ...state.postToUpload, userEmail: this.props.user.email } }));
        const { dispatch } = this.props
        await dispatch(addPost(this.state.postToUpload))
        const { history } = this.props;
        history.push('/'); 
    };

    handleImageChange = async (e) =>{
        e.preventDefault();
        let file = e.target.files[0];
        if(file.size > 300000) { 
            this.refs.image.value = '';
            this.notify('The file is too big, upload another one')
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState((state) => ({ postToUpload: { ...state.postToUpload, image_url: reader.result } }));
        };
      }
      notify = (txt) => toast(txt);

    render() {
        const { postToUpload} = this.state;
        
        return (
            <div className="post-details">
                <ToastContainer />
                <h1 className="titlePost"><Badge className="badgeTitle" variant="secondary">publish your own post</Badge></h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                    className="titleInput"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        value={postToUpload.title}
                        placeholder="Post title"
                        required
                    />
                    <input ref="image" className="fileInput" accept="image/png, image/jpeg"  required type="file" onChange={this.handleImageChange}></input>
                    <button className="postBtn">POST</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer, userReducer }) => {
    const { posts } = postsReducer;
    const {user} = userReducer;

    return {
        posts,
        user
    }
}

export default connect(mapStateToProps)(addNewPost)