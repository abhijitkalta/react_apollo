import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongDetailQuery from '../queries/fetchSongDetail'; 
import LyricCreate from './lyricCreate';
import LyricList from './lyricList';

class SongDetail extends Component {
	constructor(props){
		super(props); 
	};

	render(){
		if(this.props.data.loading){
			return <div>Loading..</div>;
		};
		return(
			<div>
				<Link to="/">Back</Link>
				<h3>{this.props.data.song.title}</h3>
				<LyricList lyrics={this.props.data.song.lyrics} />
				<LyricCreate songId={this.props.params.id}/>
			</div>
		);
	}
};

export default graphql(fetchSongDetailQuery, {
	options: (props) => { return { variables: {id: props.params.id}}}
})(SongDetail);