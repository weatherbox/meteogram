import React, { Component } from 'react'
import arrow from './arrow.svg'

export default class WindRow extends Component {
	render() {
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d.wind.speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)

					let from_dir = Math.round(d.wind.from / 22.5) * 22.5

					return (
						<td className='wind' key={i}>
          					<img src={arrow} className='wind-arrow' alt='N' style={{ transform: 'rotate(' + from_dir + 'deg)' }}/>
							{speed}
						</td>
					)
				})}
			</tr>
		)
	}
}
