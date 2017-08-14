import React from 'react';
import CommentConfirmation from './commentconfirmation';

export default class Comment extends React.Component {
  constructor(){
    super();
    this.state = {
      isAbusive: false
    }
    this._toggleAbuse = this._toggleAbuse.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
  }
  /*_handleDelete(event){
    event.preventDefault();
    if(confirm('Are you sure?')){
      this.props.onDelete(this.props.comment); // passing the current comment like an argument
    }
  }*/
  _handleDelete(){
    this.props.onDelete(this.props.id);
  }
  _toggleAbuse(){
    this.setState({
      isAbusive: !this.state.isAbusive
    })
  }
  render(){
    let commentBody;
    let abusiveConfirmation;
    if(!this.state.isAbusive){
      commentBody = this.props.body;
      abusiveConfirmation = 
          <CommentConfirmation onConfirm={this._toggleAbuse}>
            Report abuse
          </CommentConfirmation>
    } else {
      commentBody = <em>Content marked as abusive</em>; 
    }
    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {commentBody}
        </p>
        <div className="comment-footer">
          <CommentConfirmation onConfirm={this._handleDelete}>
            Delete comment?
          </CommentConfirmation>

          {abusiveConfirmation}
        </div>
      </div>
    )
  }
}