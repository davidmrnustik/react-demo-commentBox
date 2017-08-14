import React from 'react';
import Comment from './comment';
import CommentForm from './commentform';
import CommentAvatarList from './commentavatarlist';
import jQuery from 'jquery';

export default class CommentBox extends React.Component {
  constructor(){
    super();

    this._addComment = this._addComment.bind(this);
    this._deleteComment = this._deleteComment.bind(this); // pre-bind a handle like this, we olny using one reference in memory, and not recreating them everytime when app gets rendered

    this.state = {
      showComments: false,
      comments: []
      /*comments: [
        { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
        { id: 2, author: "Bending Bender", body: "Excellent stuff" },
        { id: 3, author: "John Toshak", body: "Go travel!" }
      ]*/
      // since comments will change over time, they shoul be part of the component's state 
    }
  }
  _getComments(){

    /*const commentList = [
      { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
      { id: 2, author: "Bending Bender", body: "Excellent stuff" },
      { id: 3, author: "John Toshak", body: "Go travel!" }
    ];

    return commentList.map((comment) => {
      return (<Comment
        author={comment.author} body={comment.body} key={comment.id} />);
    });*/

    return this.state.comments.map((comment) => {
      return (
        <Comment
          /*
          avatarUrl={comment.avatarUrl}
          author={comment.author}
          body={comment.body}
          comment={comment}
          */
          {...comment}
          //onDelete={this._deleteComment.bind(this)} // will later be called in the context of the CommentBox component
          //onDelete={(commentID) => this._deleteComment(commentID)} // it's the same like above, because inside the arrow function we invoke the function
          onDelete = {this._deleteComment}
          key={comment.id} />
      );
    });

  }
  _getCommentsTitle(commentCount){
    if(commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1){
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }
  /*
  _addComment(author, body){ // gets triggered by CommentForm when a new comment is added
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) }); // New array references help React stay fast. So contact works better than push here.
  }
  */
  _fetchComments(){
    jQuery.ajax({
      method: 'GET',
      url: `http://localhost:3000/comments?page=${this.props.apiUrl}`,
      success: (comments) => { // arrow function preserves the this binding to our class
        this.setState({ comments })
      }
    })
    // _fetchComments calls setState, which calls render() - that's mean we can't call _fetchComments from render, because we will get an infinite loop
  }
  _getAvatars(){
    return this.state.comments.map((comment) => {
      return comment.avatarUrl;
    })
  }
  _addComment(author, body){
    const comment = {
      //id: this.state.comments.length + 1,
      author,
      body,
      page: this.props.apiUrl,
      avatarUrl: `https://randomuser.me/api/portraits/thumb/men/${parseInt(this.state.comments.length + 1)}.jpg`
    }

    /*jQuery.post('http://localhost:3000/comments', { comment })
      .success(newComment => {
        this.setState({ comments: this.state.comments.concat([newComment]) });
      });*/
      jQuery.ajax({
        method: 'POST',
        url: 'http://localhost:3000/comments',
        data: comment,
        dataType: 'json',
        success: (newComment) => {
          this.setState({ comments: this.state.comments.concat([newComment]) });
        }
      })
      // state is only updated when we get the new comment from the API request
  }
  _deleteComment(commentID){
    jQuery.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/comments/${commentID}`
    });

    const comments = [...this.state.comments]; // use spread operator to clone existing array
    const commentIndex = comments.indexOf(commentID);
    comments.splice(commentIndex, 1);

    this.setState({ comments });
  }
  componentWillMount(){
    this._fetchComments(); // fetch comments from server before component is rendered
  }
  componentDidMount(){
    this._timer = setInterval(() => this._fetchComments(), 5000);
  }
  componentWillUnmount(){
    clearInterval(this._timer);
  }
  render(){
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';
    if(this.state.showComments){
      commentNodes = <div className="comment-list">{comments}</div>
      buttonText = 'Hide comments';
    }
    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment} />
        <CommentAvatarList avatars={this._getAvatars()} />
        <h3>Comments</h3>
        <div className="comment-count">{this._getCommentsTitle(comments.length)}</div>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
          {commentNodes}
      </div>
    )
  }
}

CommentBox.propTypes = {
  apiUrl: React.PropTypes.string.isRequired
}