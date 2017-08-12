import React from 'react';

export default class Comment extends React.Component {
  _handleDelete(event){
    event.preventDefault();
    if(confirm('Are you sure?')){
      this.props.onDelete(this.props.comment); // passing the current comment like an argument
    }
  }
  render(){
    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete comment
          </a>
        </div>
      </div>
    )
  }
}