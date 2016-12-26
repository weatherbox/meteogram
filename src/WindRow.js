import React, { Component } from 'react'

export default class WindRow extends Component {
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
