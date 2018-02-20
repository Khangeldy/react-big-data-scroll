import React from 'react';
import PropTypes from 'prop-types'
import ScrollView from './ScrollView'

class InfinityScroll extends React.Component {
  static propTypes = {
    resetScroll: PropTypes.string,
    users: PropTypes.array
  }
  state = {
    hundred: 100
  }

  onScrollEnd = (hundred) => {
    this.setState({hundred: hundred + 100})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.resetScroll !== this.props.resetScroll) {
      this.setState({hundred: 100});
    }
  }

	render() {
    const { users } = this.props
    const sliced = users && users.slice(0, this.state.hundred);

		return <div style={{height: '100%'}}>
      { React.cloneElement(React.Children.only(this.props.children), {list: sliced, onScrollEnd: this.onScrollEnd}) }
    </div>
  }
}

export default InfinityScroll
