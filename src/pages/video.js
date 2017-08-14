import React from 'react';
import CommentBox from './../components/commentbox';

export default class VIdeoPage extends React.Component {
  render(){
    return(
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/4ALXnajtelM" frameBorder="0" allowFullScreen></iframe>
        <CommentBox />
      </div>
    )
  }
}