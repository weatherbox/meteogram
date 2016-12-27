import React, { Component } from 'react'

const arrow_path = "M16.791,13.254c0.444-0.444,1.143-0.444,1.587,0c0.429,0.444,0.429,1.143,0,1.587l-6.65,6.651c-0.206,0.206-0.492,0.333-0.809,0.333c-0.317,0-0.603-0.127-0.81-0.333l-6.65-6.651c-0.444-0.444-0.444-1.143,0-1.587s1.143-0.444,1.587,0l4.746,4.762V1.111C9.791,0.492,10.299,0,10.918,0c0.619,0,1.111,0.492,1.111,1.111v16.904L16.791,13.254z"

const arrow_colors = [
	'#0074bf', // blue
	'#56a764', // green
	'#de9610', // orange
	'#c93a40'  // red
]

export default class Wind extends Component {
	render() {
		let dir = Math.round(this.props.dir / 22.5) * 22.5
		let rank = Math.min(3, Math.floor(this.props.speed / 5))
		let color =  arrow_colors[rank]

		return (
			<svg width='14px' viewBox='0 0 21.825 21.825'>
				<g transform={'rotate(' + dir + ' 10.9125 10.9125)'}>
					<path style={{ fill:color }} d={arrow_path}/>
				</g>
			</svg>
		)
	}
}
