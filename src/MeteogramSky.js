import React, { Component } from 'react'

export default class MeteogramSky extends Component {
	state = {
		data: {}
	}

	componentWillMount() {
		this.getSkyData(this.props.lat, this.props.lon)
	}

	getSkyData = (lat, lon) => {
		let self = this
		fetch('https://msm-api.herokuapp.com/sky/current/' + lat + '/' + lon, { mode: 'cors' })
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				console.log(json)
				self.setState({ data: json })
			}).catch(function(e) {
				console.error(e)
			})
	}

	render() {
		return (
			<div>
				<h1>{this.props.lat},{this.props.lon}</h1>
				{JSON.stringify(this.state.data)}
			</div>
		)
	}
}

