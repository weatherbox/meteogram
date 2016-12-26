import React, { Component } from 'react'


export default class MeteogramTimeHeader extends Component {
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

