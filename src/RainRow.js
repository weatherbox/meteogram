import React, { Component } from 'react'

export default class RainRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let rain = (d.rain !== null && d.rain !== 0) ? d.rain.toFixed(1) : ''
					if (rain >= 10) rain = Math.round(rain)
					return (<td key={i}>{rain}</td>)
				})}
			</tr>
		)
	}
}
