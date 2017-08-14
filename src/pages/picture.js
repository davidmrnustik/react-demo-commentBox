import React from 'react';
import CommentBox from './../components/commentbox';

export default class PicturePage extends React.Component {
  render(){
    return(
      <div>
        <img src="http://lorempixel.com/640/480/nature" />

        <CommentBox />
      </div>
    )
  }
}