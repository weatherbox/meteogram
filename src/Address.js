import React, { Component } from 'react'

import fetchJsonp from 'fetch-jsonp'

const reverseGeocoder = 'http://reverse.search.olp.yahooapis.jp/OpenLocalPlatform/V1/reverseGeoCoder'
const appid = 'dj0zaiZpPUMxWjJWSEY2dEd5MSZzPWNvbnN1bWVyc2VjcmV0Jng9NjM-'


export default class Address extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: this.props.lat + ',' + this.props.lon
		}
	}

	componentWillMount() {
		let self = this
		let query = 'lat=' + this.props.lat + '&lon=' + this.props.lon +
			'&output=json&appid=' + appid
		fetchJsonp(reverseGeocoder + '?' + query, { mode: 'cors' })
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				console.log(json)
				let name = json.Feature[0].Property.AddressElement[1].Name;
				if (name) self.setState({ name: name })
			}).catch(function(e) {
				console.error(e)
			})
	}

	render() {
		return (<h1>{this.state.name}</h1>)
	}
}
