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

				if (res.features.length > 1){
					let name
					res.features.reverse()
					if (res.features.length > 4) {
						name = res.features[2].text + res.features[3].text
					}else{
						name = res.features[1].text + res.features[2].text
						if (res.features[3] && res.features[3].id.match('locality')){
							name += res.features[3].text
						}
					}
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
