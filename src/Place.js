import React, { Component } from 'react'

import Mapbox from 'mapbox'

const mapbox = new Mapbox('pk.eyJ1IjoidGF0dGlpIiwiYSI6ImNpeDZiczZpMjAwMzEyb251d2I2ems3NHMifQ.0ruYMWasXlL_73pgjZetog')

export default class Place extends Component {
	state = {
		name: '',
		lat: null,
		lon: null
	}

	constructor(props) {
		super(props)
		this.state = {
			name: this.latLonName(this.props.lat, this.props.lon)
		}
	}

	componentWillMount() {
		this.reverseGeocode(this.props.lat, this.props.lon)
	}

	latLonName = (lat, lon) => {
		lat = (lat.toString(10) <= 6) ? lat : lat.toFixed(4)
		lon = (lon.toString(10) <= 6) ? lon : lon.toFixed(4)
		return lat + ', ' + lon
	}

	reverseGeocode = (lat, lon) => {
		let self = this
		mapbox.geocodeReverse(
			{ latitude: lat, longitude: lon },
			function (err, res){
				if (err) console.error(err)
				console.log(res)

				if (res.features){
					let names = res.features[1].place_name.split(',')
					let name = names[0] + ', ' + names[1]
					self.setState({ name: name, lat, lon })
				}else{
					self.setState({ lat, lon })
				}
		})
	}

	render() {
		let { lat, lon } = this.props
		if (lat !== this.state.lat || lon !== this.state.lon){
			this.state.name = this.latLonName(lat, lon)
			this.reverseGeocode(lat, lon)
		}
		return (<div className='place-name'>{this.state.name}</div>)
	}
}
