import React, { useState } from "react";
import useSWR from "swr";
import CurrentUserDisplay from "./currentUserDisplay";

// Custom hook to fetch products
const useProducts = () => {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR(
		"https://dummyjson.com/products?limit=5",
		fetcher,
	);
	return { data, error };
};

const UsersList = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const { data, error } = useProducts();

	if (error) return <div>Error loading data</div>;
	if (!data) return <div>Loading...</div>;

	const users = [
		{ id: 1, products: [1, 2] },
		{ id: 2, products: [3, 4] },
		{ id: 3, products: [1, 4, 5] },
	];

	const handleUserChange = (event) => {
		const userId = parseInt(event.target.value);
		setCurrentUser(userId);
	};

	const filteredProducts = currentUser
		? data.products.filter((product) =>
				users
					.find((user) => user.id === currentUser)
					.products.includes(product.id),
		  )
		: [];

	return (
		<div>
			<CurrentUserDisplay
				users={users}
				currentUser={currentUser}
				handleUserChange={handleUserChange}
				filteredProducts={filteredProducts}
			/>

			<h2>All products</h2>
			<ol>
				{data.products.map((product) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ol>
		</div>
	);
};

export default UsersList;
