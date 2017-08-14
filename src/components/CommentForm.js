import React from 'react';

export default class CommentForm extends React.Component {
  constructor(){
    super();
    this.state = {
      characters: 0
    }
  }
  _handleSubmit(event){
    event.preventDefault(); // prevents page from reloading
    if(!this._author.value || !this._body.value){
      alert("Please enter your name and comment");
      return;
    }

    const author = this._author;
    const body = this._body;

    this.props.addComment(author.value, body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({
      characters: 0
    })
  }
  _getCharacterCount(){
    this.setState({
      characters: this._body.value.length
    });
  }
  render(){
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <div>
            <input placeholder="Name: " ref={(input) => this._author = input}/>
          </div>
          <div>
            <textarea
              placeholder="Comment: "
              ref={(textarea) => this._body = textarea}
              onChange={this._getCharacterCount.bind(this)}>
            </textarea>
          </div>
        </div>
        <p>{this.state.characters} characters</p>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
          </button>
        </div>
      </form>
    );
  }
}