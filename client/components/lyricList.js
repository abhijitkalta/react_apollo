import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  constructor(props){
    super(props);
    this.renderLyrics = this.renderLyrics.bind(this);
  };

  handleLike(id, likes){
    console.log(id);
    this.props.mutate({
      variables: {id},
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics(){
    return this.props.lyrics.map((lyric) => {
      return(
         <li key={lyric.id} className="collection-item">
           {lyric.content}
           <div className="vote-box">
              {lyric.likes}
              <i 
              className="material-icons"
              onClick = {()=>{this.handleLike(lyric.id, lyric.likes)}}
              >thumb_up</i>
            </div>
         </li>
      );
    })
  };

  render(){
    return (
      <div>
        Lyrics List
        <ul className="collection">
          {this.renderLyrics()}
        </ul>
      </div>
    );
  }
};

const mutation = gql`
  mutation LikeLyric($id: ID){
    likeLyric(id: $id){
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);