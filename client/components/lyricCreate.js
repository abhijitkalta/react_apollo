import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class LyricCreate extends Component {
	constructor(props){
		super(props);
		this.state = {
			content: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(e){
		this.setState({
			content: e.target.value
		})
	};

	handleSubmit(e){
		e.preventDefault();
		this.props.mutate({
			variables: {
				songId: this.props.songId,
				content: this.state.content
			}
		}).then(() => {
			this.setState({
				content: ''
			});
		})
	};

	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label> Add a lyric </label>
						<input 
							value={this.state.content} 
							onChange={this.handleChange}
						/> 
				</form>
			</div>
		)
	}
};

const mutation = gql`
	mutation AddLyricToSong($content: String, $songId: ID){
		addLyricToSong(content: $content, songId: $songId){
			id 
			lyrics {
				id
				content
				likes
			}
		}
	}
`;


export default graphql(mutation)(LyricCreate);