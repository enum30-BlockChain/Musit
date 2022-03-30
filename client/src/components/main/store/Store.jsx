import "./Store.css"
import React from 'react'
import { Link, Outlet } from "react-router-dom"
import ItemCard from "./ItemCard"

function createTestArray (num) {
  const array = []
  for (let i = 0; i < num; i++) {
    const testData = {
			title: `title-${i}`,
			genre: `genre-${i}`,
			description: `descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescr-${i}`,
			image: `image-${i}`,
		};
    array.push(testData)
  }
  return array
}


export const Store = () => {
  

  return (
		<div className="store">
			<div className="title">Musit NFT Store</div>
			<div className="itemcard-container">
				{createTestArray(10).map((data) => (
					<ItemCard
						title={data.title}
						genre={data.genre}
						image={data.image}
						description={data.description}
					/>
				))}
			</div>
		</div>
	);
}
