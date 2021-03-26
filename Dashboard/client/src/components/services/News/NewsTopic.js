import React from 'react';

const apiKey = 'e40802492f0548ee9fb857dd15db7805';

export default class NewsTopic extends React.Component {
  state = {
    q: [],
    topic: ''
  };

  handleInput = e => {
    this.setState(
      {
      [e.target.name]: e.target.value
      }
    );
  };

  getTopic = () => {
    fetch(`https://newsapi.org/v2/top-headlines?q=${this.state.topic}&apiKey=${apiKey}`)
      .then( res => res.json())
      .then(data => {
        this.setState({
          q: data.articles,
          topic: ''
        });
        console.log(data);
      });
  };

  render() {
    const { topic, q } = this.state;

    return (
      <div>
        <h1>Specific Topic</h1>
        <div>
          <input name='topic' type='text' placeholder='Choose Topic' value={topic} onChange={this.handleInput} />
          <button onClick={this.getTopic}>Get News</button>
          <ul>
            {q.map( post =>
              <li key={post.articles}>{post.title} {post.url}</li>)}
          </ul>
        </div>
      </div>
    );
  }
};