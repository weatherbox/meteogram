import React, { Component } from 'react'

import Mapbox from 'mapbox'

const mapbox = new Mapbox('pk.eyJ1IjoidGF0dGlpIiwiYSI6ImNpeDZiczZpMjAwMzEyb251d2I2ems3NHMifQ.0ruYMWasXlL_73pgjZetog')

export default class Place extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.lat + ',' + this.props.lon
		}
	}

	componentWillMount() {
		let self = this
		mapbox.geocodeReverse(
			{ latitude: this.props.lat, longitude: this.props.lon },
			function (err, res){
				if (err) console.error(err)
				console.log(res)
				let names = res.features[1].place_name.split(',')
				let name = names[0] + ', ' + names[1]
				self.setState({ name: name })
		})
	}

	render() {
		return (<h3>{this.state.name}</h3>)
	}
}
