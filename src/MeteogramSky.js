import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import './MeteogramSky.css'
import 'whatwg-fetch'

import Place from './Place'
import TimeHeader from './TimeHeader'
import WindRow from './WindRow'
import WindUpperRow from './WindUpperRow'
import TempRow from './TempRow'
import RainRow from './RainRow'

const MSM_API = 'https://5w1rrej03e.execute-api.ap-northeast-1.amazonaws.com/dev' 

export default class MeteogramSky extends Component {
	state = {
		data: {},
		lat: null,
		lon: null,
		loading: true,
	}

	componentWillMount() {
		this.getSkyData(this.props.lat, this.props.lon)
	}

	getSkyData = (lat, lon) => {
		let self = this
		fetch(MSM_API + '/sky/current/' + lat + '/' + lon, { mode: 'cors' })
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				console.log(json)
				self.setState({ data: json, lat, lon, loading: false })
			}).catch(function(e) {
				console.error(e)
			})
	}

	render() {
		let { lat, lon } = this.props
		if (lat !== this.state.lat || lon !== this.state.lon){
			this.state.loading = true
			this.getSkyData(lat, lon)
		}

		let table
		if (this.state.data.ref_time){
			let data = this.state.data
			let refTimeUTC = this.utc(data.ref_time)
			let endTimeUTC = this.forecastTime(refTimeUTC, 39)

			table = (
				<table className='meteogram-table'>
					<TimeHeader start={refTimeUTC} end={endTimeUTC} />

					<tbody>
						<WindUpperRow data={data.upper_wind} level={850} />
						<WindUpperRow data={data.upper_wind} level={900} />
						<WindUpperRow data={data.upper_wind} level={950} />
						<WindUpperRow data={data.upper_wind} level={975} />
						<WindUpperRow data={data.upper_wind} level={1000} />
						<WindRow data={data.surface} />
						<TempRow data={data.surface} />
						<RainRow data={data.surface} />
					</tbody>
				</table>
			)
		}
			
		let legend = (
			<div className='meteogram-legend'>
				<div className='legend-upper'>1500m</div>
				<div className='legend-upper'>900m</div>
				<div className='legend-upper'>600m</div>
				<div className='legend-upper'>300m</div>
				<div className='legend-upper'>100m</div>
				<div className='legend-surface-wind'>Surface</div>
				<div>気温</div>
				<div>降水</div>
			</div>
		)

		let loading
		if (this.state.loading){
			loading = (
				<Dimmer active inverted style={{ height: 267 }}>
					<Loader />
				</Dimmer>
			)
		}

		return (
			<div>
				<Place lat={lat} lon={lon} />
				<div className='meteogram'>
					{table}
					{legend}
					{loading}
				</div>
			</div>
		)
	}

	utc = (dateString) => {
		return Date.UTC(
			dateString.substr(0, 4),
			dateString.substr(4, 2) - 1,
			dateString.substr(6, 2),
			dateString.substr(8, 2),
			dateString.substr(10, 2)
		)
	}

	forecastTime = (refTimeUTC, ft) => {
		return new Date(refTimeUTC + ft * 3600 * 1000)
	}
}

