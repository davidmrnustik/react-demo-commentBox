import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';
import Layout from './layout/layout';
import BlogPage from './pages/blog';
import HomePage from './pages/home';
import PicturePage from './pages/picture';
import VideoPage from './pages/video';

const app = (
  <Router history={hashHistory}>
    <div>
      <Layout />
      <Route path="/" component={HomePage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/picture" component={PicturePage} />
      <Route path="/video" component={VideoPage} />
    </div>
  </Router>
)

ReactDOM.render(app, document.getElementById('comment-box'), function(){
  console.timeEnd('react-app')
});