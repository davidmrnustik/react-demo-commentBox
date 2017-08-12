import React from 'react';
import CommentBox from './commentbox';

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    const now = new Date();
    const topicList = ["HTML", "JavaScript", "React"];

    return (
      <div>
        <h3>Stories</h3>
        <p className='lead'>
          Current time: {now.toTimeString()}
        </p>
        <ul>
          {topicList.map( (topic, i) => <li key={i}>{topic}</li> )}
        </ul>
        <CommentBox />
      </div>
    )
  }
}

export default App;