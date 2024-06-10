import React, { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const UsersList = () => {
	const [currentUser, setCurrentUser] = useState(null);

	const { data, error } = useSWR("https://dummyjson.com/products", fetcher);

	if (error) return <div>Error loading data</div>;
	if (!data) return <div>Loading...</div>;

	const users = [
		{ id: 1, products: [1, 2] },
		{ id: 2, products: [3, 4] },
		{ id: 3, products: [1, 4, 5] },
	];

	const handleUserChange = (event) => {
		const userId = parseInt(event.target.value);
		setCurrentUser(users.find((user) => user.id === userId));
	};

	const filteredProducts = currentUser
		? data.products.filter((product) =>
				currentUser.products.includes(product.id),
		  )
		: [];

	return (
		<div className="bg-red-500">
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
			<div>Current user: {currentUser?.id}</div>
			<div>Current user data: {JSON.stringify(filteredProducts, null, 2)}</div>

			<h2>All products</h2>
			<ol>
				{data &&
					data.products.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
			</ol>
		</div>
	);
};

export default UsersList;
