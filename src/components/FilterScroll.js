import React from 'react';
import PropTypes from 'prop-types'
import InfinityScroll from './InfinityScroll'

class FilterScroll extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    filterBy: PropTypes.string,
  }

  state = {
    filtered: null
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.filterBy !== this.props.filterBy) {
      this.filterByAllFields(nextProps)
    }

    if(nextProps.users !== this.props.users) {
      this.filterByAllFields(nextProps)
    }
  }

  filterByAllFields = (nextProps) => {
    const { filterBy, users } = nextProps
    if(!filterBy || filterBy.length < 2) {
      this.setState({filtered: users})
    } else {
      const newUsers = [];
      for(let i = 0, ii = users.length; i < ii; i++) {
        const keys = Object.keys(users[i]);
        for(let j = 0, jj = keys.length; j < jj; j++) {
          if(keys[j] === 'avatar') {
            continue;
          }
          let value = users[i][keys[j]];
          const startIndex = typeof value === 'string' && value.toLowerCase().indexOf(filterBy.toLowerCase())
          if(typeof startIndex === 'number' && startIndex > -1) {
            let newUser = Object.assign({}, users[i], {
              [keys[j]]: [value.slice(0, startIndex), <mark key={1}>{value.slice(startIndex, startIndex + filterBy.length)}</mark>, value.slice(startIndex + filterBy.length)]
            })
            newUsers.push(newUser);
            break;
          }
        }
      }
      this.setState({filtered: newUsers})
    }
  }

	render() {
    const { filtered } = this.state;
		return <div style={{height: '100%'}}>
      { React.cloneElement(React.Children.only(this.props.children), {users: filtered}) }
    </div>
  }
}

export default FilterScroll
