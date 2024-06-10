import React from "react";

const CurrentUserDisplay = ({
	users,
	currentUser,
	handleUserChange,
	filteredProducts,
}) => {
	return (
		<div>
			<div>
				{users.map((user) => (
					<label key={user.id}>
						<input
							type="radio"
							value={user.id}
							name="id"
							onChange={handleUserChange}
						/>
						user: {user.id}
					</label>
				))}
			</div>

			<div>Current user: {currentUser}</div>
			<ul>
				{filteredProducts.map((product) => (
					<li key={product.id}>
						{product.id}. title: {product.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CurrentUserDisplay;
