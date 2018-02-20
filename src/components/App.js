import React from 'react'
import PropTypes from 'prop-types'
import FilterScroll from './FilterScroll'
import InfinityScroll from './InfinityScroll'
import ScrollView from './ScrollView'
import UserView from './UserView'

class App extends React.Component {

	state = {
		users: [],
		searchStr: ''
	}

	componentDidMount() {
		fetch('http://localhost:3002', {
			mode: 'cors'
		})
			.then(response => response.json())
			.then(users => {
				this.setState({users})
			})
			.catch(err => err.message)
	}

	onInput = (value) => {
		this.setState({searchStr: value.trim()})
	}

	timeout = null;

	delayCallback = (e) => {
	  if(this.timeout)
	    clearTimeout(this.timeout)
		const value = e.target.value;
	  this.timeout = window.setTimeout(this.onInput, 500, value)
	}

	render() {
		return (
			<div className="app container">
				<header className="app-header">
					<input className="full-input" type="search" tabIndex="0" onInput={this.delayCallback} />
				</header>
				<section className="app-content">
					<FilterScroll
						users={this.state.users}
						filterBy={this.state.searchStr}
					 >
						 <InfinityScroll
							 resetScroll={this.state.searchStr}
			         >
								 <ScrollView
					         className="scroll-container"
					         rowHeight={200}
					         resetScroll={this.state.searchStr}
									 render={UserView}
					         >
					       </ScrollView>
			       </InfinityScroll>
					 </FilterScroll>
				</section>
			</div>
		)
	}
}

export default App
