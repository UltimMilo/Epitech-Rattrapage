import React from 'react';

const apiKey = 'e40802492f0548ee9fb857dd15db7805';

export default class TestNews extends React.Component {
  state = {
    countries: ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa" ,"se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"],
    // base: 'fr',
    choosen: '',
    posts: []
  };

  handleSelect = e => {
    this.setState(
      {
        choosen: e.target.value,
        data: null
      },
      this.getNews
    );
  };

  getNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?country=${this.state.choosen}&apiKey=${apiKey}`)
      .then( res => res.json())
      .then(data => {
        this.setState({
          posts: data.articles
        });
        console.log(data);
      });
  };

  render() {
    const { countries, choosen,  posts } = this.state;
    return(
      <div>
        <h1>Country Top News</h1>
        <select
          name='country'
          value={choosen}
          onChange={this.handleSelect}>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
        </select>
        <div>
            <ul>
              {posts.map(post => (
                <li key={post.articles}>{post.title} {post.url}</li>
              ))}
            </ul>
        </div>
      </div>
    );
  }
} 