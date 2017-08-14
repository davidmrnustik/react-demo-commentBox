import React from 'react';

export default class HomePage extends React.Component {
  render(){
    const now = new Date();
    const topicList = ["HTML", "JavaScript", "React"];

    return(
      <div>
        <h3>Stories</h3>
        <p className='lead'>
        Current time: {now.toTimeString()}
        </p>
        <ul>
        {topicList.map( (topic, i) => <li key={i}>{topic}</li> )}
        </ul>
      </div>  
    )
  }
}