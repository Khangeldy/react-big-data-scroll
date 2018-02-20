import React from 'react';
import PropTypes from 'prop-types'

const scrollContainerStyles = {
	height: '100%',
	overflowY: 'scroll'
}

class ScrollView extends React.Component {
	constructor(props) {
    super(props)
		this.onScroll = this.onScroll.bind(this)
	}

	static propTypes = {
		rowHeight: PropTypes.number.isRequired,
		list: PropTypes.array,
		resetScroll: PropTypes.string
	}

	state = {
		scrollTop: 0,
		availableHeight: 0
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.resetScroll !== this.props.resetScroll) {
			this.scrollContainer.scrollTop = 0;
		}

	}

	onScroll(e) {
		// console.log(e.target.scrollTop)
		// console.log(e.target.tagName)
		const st = e.target.scrollTop;
		this.setState({
			scrollTop: st
		})
		if(this.props.onScrollEnd && e.target.scrollHeight - e.target.clientHeight - 50 < st) {
			this.props.onScrollEnd(this.props.list.length)
		}
	}

	componentDidMount() {
		if(this.scrollContainer) {
			this.setState({availableHeight: this.scrollContainer.clientHeight})
		}
	}

	render() {
		const { rowHeight, list, render:Render } = this.props
		const ll = list && list.length
		if(!ll) {
			return <div style={scrollContainerStyles} ref={(node) => this.scrollContainer = node} >No Items</div>
		}
		const { scrollTop, availableHeight } = this.state
		const totalHeight = ll * rowHeight;
		const scrollBottom = scrollTop + availableHeight;

		const startIndex = Math.max(Math.floor(scrollTop / rowHeight)  - 1, 0)
		const endIndex = Math.min(ll, Math.ceil(scrollBottom / rowHeight) + 1)

		const items = [];
		let index = startIndex;
		while(index < endIndex) {
			items.push(<li key={index}><Render user={list[index]}/></li>);
			index++;
		}
		return <div
				ref={(node) => this.scrollContainer = node}
				style={scrollContainerStyles}
				onScroll={this.onScroll}
			>
			<ul style={{
				paddingTop: startIndex * rowHeight,
				pointerEvents: 'none',
				height: totalHeight
			}}
				className="unstyled-list"
			>
				{items}
			</ul>
		</div>
	}
}

export default ScrollView
