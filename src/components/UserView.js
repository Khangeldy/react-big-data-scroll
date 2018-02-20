import React from 'react'
import PropTypes from 'prop-types'

const UserView = ({ user }) => {
	// const img = new Image();
	// img.src = user.avatar
	return (
		<div className="figure _item" style={{height: '198px'}}>
			<figure className="figure-image">
				{/* <img src={user.avatar} alt={user.name} /> */}
			</figure>
			<div className="figcaption item_desc">
				<div className="flex_desc">
					<h3 className="item_name">{user.fullName}</h3>
					<p className="item_position">{user.title}</p>
					<p className="item_address">{user.city} { user.address }</p>
				</div>
				<button className="item_action"><span className="action-span">Skip selection</span></button>
				<div className="item_email">{user.email}</div>
			</div>
		</div>
	)
}
UserView.propTypes = {
	user: PropTypes.object.isRequired
}

export default UserView
