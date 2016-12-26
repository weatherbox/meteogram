import React, { Component } from 'react'
import arrow from './arrow.svg'

export default class WindUpperRow extends Component {
	render() {
		let level = this.props.level
		let length = this.props.data.length
		return (
			<tr>
				{this.props.data.map((d, i) => {
					let speed = d[level].speed.toFixed(1)
					if (speed >= 10) speed = Math.round(speed)

					let from_dir = Math.round(d[level].from / 22.5) * 22.5

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
							<img src={arrow} className='wind-arrow' alt='N' style={{ transform: 'rotate(' + from_dir + 'deg)' }}/>
							{speed}
						</td>
					)
				})}
			</tr>
		)
	}
}
