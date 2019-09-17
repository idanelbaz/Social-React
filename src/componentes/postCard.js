import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';

export default class PostCard extends Component {

followUser=()=> { 
    this.props.followUser(this.props.post.user_id)
}

deletePost=()=> { 
    this.props.deletePost(this.props.post.post_id)
}

    render() {
        const {post, user}  = this.props;

        return (
            <Card style={{ width: '19rem', height: '20rem' }}>
                <Card.Img variant="top" src={post.image_url} />
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    {user.data.user_id !== post.user_id &&
                       <Button onClick={this.followUser} title="Follow" variant="primary">Follow user number {post.user_id}</Button>
                   }  
                   {user.data.user_id === post.user_id &&
                       <Button onClick={this.deletePost} title="Delete" variant="danger"><span role="img">🗑️</span></Button>
                   } 
                </Card.Body>
            </Card>
        )

    }

}