import React from 'react';

class CommentAvatarList extends React.Component {
  render(){
    const { avatars = [] } = this.props;
    return(
      <div className="comment-avatar">
        <h4>Authors</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}>
              <img src={avatarUrl} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CommentAvatarList;