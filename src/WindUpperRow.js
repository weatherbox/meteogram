import React, { Component } from 'react'
import Wind from './Wind'

export default class WindUpperRow extends Component {
	render() {
		let level = this.props.level
		let length = this.props.data.length
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d[level].speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)

					let style = {}, colSpan = 3

					if (i === 0){
						colSpan = 2
						style.textAlign = 'left'
					}else if (i === length - 1) {
						colSpan = 2
						style.textAlign = 'Right'
					}

					return (
						<td className='wind-upper' colSpan={colSpan} key={i}>
							<Wind dir={d[level].from} speed={speed} />
							{speed}
						</td>
					)
				})}
			</tr>
		)
	}
}
