import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import './MeteogramSky.css' 

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
		let table
		if (this.state.data.ref_time){
			let refTimeUTC = this.utc(this.state.data.ref_time)
			let endTimeUTC = this.forecastTime(refTimeUTC, 39)

			table = (
				<Table celled structured className='meteogram-table' style={{ display:'block', overflowX:'scroll', width:'auto' }}>
					<MeteogramTimeHeader start={refTimeUTC} end={endTimeUTC} />
				</Table>
			)
		}

		return (
			<div>
				<h1>{this.props.lat},{this.props.lon}</h1>
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
		for (var d = this.props.start; d < this.props.end; d += 3600 * 1000){
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
			<Table.Header>
				<Table.Row>
					{this.hours.map((day, i) => {
						return (
							<Table.HeaderCell colSpan={day.hours.length} key={i}>
								{day.day}
							</Table.HeaderCell>
						)
					})}
				</Table.Row>
				<Table.Row>
					{this.hours.map((day) => {
						return day.hours.map((hour) => {
							return (<Table.HeaderCell>{hour}</Table.HeaderCell>)
						})
					})}
				</Table.Row>
			</Table.Header>
		)
	}
}

