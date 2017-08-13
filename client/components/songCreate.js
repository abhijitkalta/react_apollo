import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongQuery from '../queries/fetchSongs';

class SongCreate extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(e){
		this.setState({
			title: e.target.value
		});
	};

	handleSubmit(e){
		e.preventDefault();
		this.props.mutate({
			variables: {
				title: this.state.title
			},
			refetchQueries: [{query: fetchSongQuery}]
		}).then(() => {
			hashHistory.push('/');
		})
	};

	render(){
		return(
			<div>
				<Link to="/">Back</Link>
				<h3> Create a New Song </h3>
				<form onSubmit={this.handleSubmit}>
					<label>Song Title</label>
					<input value={this.state.title} onChange={this.handleChange}/>
				</form>
			</div>
		);
	}
};

const mutation = gql`
	mutation AddSong($title: String){
		addSong(title: $title){
			title
		}
	}
`;


export default graphql(mutation)(SongCreate);
