import React, { Component } from 'react'

export default class WindUpperRow extends Component {
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
