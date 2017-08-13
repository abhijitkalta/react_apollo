import React, { Component } from  'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link} from 'react-router';

import fetchSongQuery from '../queries/fetchSongs';

class SongList extends Component {
	constructor(props){
		super(props);
		this.renderSongs = this.renderSongs.bind(this);
		this.handleSongDelete = this.handleSongDelete.bind(this);
	};

	handleSongDelete(id){
		this.props.mutate({
			variables: {
				id: id
			}
		}).then(() => this.props.data.refetch()); //it refetches any query associated with the component
	}

	renderSongs(){
		return this.props.data.songs.map(song => {
			return <li key={song.id} className="collection-item">
				<Link to={`/songs/${song.id}`}>{song.title}</Link>
				<i 
				className="material-icons"
				onClick={() => this.handleSongDelete(song.id)}
				>delete</i>
				</li>
		})
	};

	render(){
		if(this.props.data.loading){
			return <div>Loading..</div>;
		};
		return (
			<div>
				<ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link
					to="/songs/new"
					className="btn-floating btn-large red right">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	};
};

const mutation = gql`
	mutation DeleteSOng($id: ID){
		deleteSong(id: $id){
			id
		}
	}
`;

export default graphql(mutation)(
	graphql(fetchSongQuery)(SongList)
);
