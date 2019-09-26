import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';

export default class PostCard extends Component {

followUser=()=> { 
    this.props.followUser(this.props.post.userId)
}

deletePost=()=> { 
    this.props.deletePost(this.props.post._id)
}

    render() {
        const {post, user}  = this.props;
        console.log(user.followOn.filter(follower => { return follower._id === post.userId }))

        return (
            
            <Card style={{ width: '19rem', height: '20rem' }}>
                <Card.Img variant="top" src={post.image_url} />
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    {user._id !== post.userId && user.followOn.filter(follower => { return follower._id === post.userId }).length === 0 &&
                       <Button onClick={this.followUser} title="Follow" variant="primary">Follow {post.userEmail}</Button>
                    }
                    {user._id !== post.userId && user.followOn.filter(follower => { return follower._id === post.userId }).length > 0 &&
                      <Card.Subtitle className="cardSub">You already follow {post.userEmail}</Card.Subtitle> 
                    }
                   {user._id === post.userId &&
                       <Button onClick={this.deletePost} title="Delete" variant="danger"><span role="img">🗑️</span></Button>
                   } 
                </Card.Body>
            </Card>
        )

    }

}