import React, { Component } from 'react'
import Wind from './Wind'

export default class WindRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d.wind.speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)

					return (
						<td className='wind' key={i}>
							<Wind dir={d.wind.from} speed={speed} />
							{speed}
						</td>
					)
				})}
			</tr>
		)
	}
}
