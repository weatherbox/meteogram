import React, { Component } from 'react'

export default class MeteogramTempRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let temp = (Math.abs(d.temp) <= 10) ? d.temp.toFixed(1) : d.temp.toFixed(0)
					return (<td key={i}>{temp}</td>)
				})}
			</tr>
		)
	}
}
