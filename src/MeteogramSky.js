import React, { Component } from 'react'
import './MeteogramSky.css'

import Address from './Address'



const MSM_API = 'https://5w1rrej03e.execute-api.ap-northeast-1.amazonaws.com/dev' 

export default class MeteogramSky extends Component {
	state = {
		data: {}
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
				self.setState({ data: json })
			}).catch(function(e) {
				console.error(e)
			})
	}

	render() {
		let table
		if (this.state.data.ref_time){
			let data = this.state.data
			let refTimeUTC = this.utc(data.ref_time)
			let endTimeUTC = this.forecastTime(refTimeUTC, 39)

			table = (
				<table className='meteogram-table'>
					<MeteogramTimeHeader start={refTimeUTC} end={endTimeUTC} />

					<tbody>
						<MeteogramWindUpperRow data={data.upper_wind} level={850} />
						<MeteogramWindUpperRow data={data.upper_wind} level={900} />
						<MeteogramWindUpperRow data={data.upper_wind} level={950} />
						<MeteogramWindUpperRow data={data.upper_wind} level={975} />
						<MeteogramWindUpperRow data={data.upper_wind} level={1000} />
						<MeteogramWindRow data={data.surface} />
						<MeteogramTempRow data={data.surface} />
						<MeteogramRainRow data={data.surface} />
					</tbody>
				</table>
			)
		}

		return (
			<div>
				<Address lat={this.props.lat} lon={this.props.lon} />
				{table}
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

class MeteogramTimeHeader extends Component {
	constructor(props) {
		super(props)

		this.hours = []
		this._createHoursList()
	}

	_createHoursList = () => {
		let nowday = null
		for (var d = this.props.start; d <= this.props.end; d += 3600 * 1000){
			var date = new Date(d);
			var day = (date.getMonth() + 1) + '/' + ('0' + date.getDate()).slice(-2)
			var hh = ('0' + date.getHours()).slice(-2)
			
			if (nowday !== day){
				nowday = day
				this.hours.push({
					day: day,
					hours: [hh]
				})
			}else{
				this.hours[this.hours.length - 1].hours.push(hh)
			}
		}
	}

	render() {
		return (
			<thead>
				<tr className='time-header-day'>
					{this.hours.map((day, i) => {
						return (
							<th colSpan={day.hours.length} key={i}>
								{day.day}
							</th>
						)
					})}
				</tr>
				<tr>
					{this.hours.map((day) => {
						return day.hours.map((hour) => {
							return (<th>{hour}</th>)
						})
					})}
				</tr>
			</thead>
		)
	}
}

class MeteogramWindRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d.wind.speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)
					return (<td key={i}>{speed}</td>)
				})}
			</tr>
		)
	}
}

class MeteogramWindUpperRow extends Component {
	render() {
		let level = this.props.level
		let length = this.props.data.length
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d[level].speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)
					if (i === 0){
						return (<td colSpan={2} style={{ textAlign:'left' }}key={i}>{speed}</td>)
					}else if (i === length - 1) {
						return (<td colSpan={2} style={{ textAlign:'Right' }}key={i}>{speed}</td>)
					}else{
						return (<td colSpan={3} key={i}>{speed}</td>)
					}
				})}
			</tr>
		)
	}
}

class MeteogramTempRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let temp = (Math.abs(d.temp) < 10) ? d.temp.toFixed(1) : d.temp.toFixed(0)
					return (<td key={i}>{temp}</td>)
				})}
			</tr>
		)
	}
}

class MeteogramRainRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let rain = (d.rain !== null) ? d.rain.toFixed(1) : '-'
					if (rain >= 10) rain = Math.round(rain)
					return (<td key={i}>{rain}</td>)
				})}
			</tr>
		)
	}
}
