OBSELET WILL COME BACK LATER FOR ANOTHER WIDGET

// import React from 'react';

// const apiKey = 'e40802492f0548ee9fb857dd15db7805';

// export default class NewsApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: [],
//       isLoaded: false
//     };
//   }
 

//   componentDidMount() {
//     fetch(`https://newsapi.org/v2/top-headlines?country=fr&apiKey=${apiKey}`)
//       .then(res => res.json())
//       .then(json => {
//         this.setState({
//           isLoaded: true,
//           posts: json.articles
//         })
//       });
//     }
    
//   render() {

//     var { isLoaded, posts } = this.state;

//     if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//         return (
//           <div>
//             <ul>
//               {posts.map(post => (
//                 <li key={post.articles}>{post.title} {post.url}</li>
//               ))};
//             </ul>
//         </div>
//       );
//     }
//   }
// };