import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ItemCard.css";

export default function ItemCard(props) {
	console.log(props);

	return (
		<>
			<Card className="itemCard">
				<CardHeader
					title={props.title}
					subheader={props.genre}
          height="100"
          avatar={
            <Avatar src="/images/profile.jpg"/>
          }
					action={
						<IconButton aria-label="settings">
							<FavoriteIcon />
						</IconButton>
					}
				/>
				<CardMedia
					component="img"
					height="200"
					image={props.image}
					alt={props.title}
				/>
				{/* <CardContent className="description">
					<Typography variant="body2" color="text.secondary">
						{props.description}
					</Typography>
				</CardContent> */}
			</Card>
		</>
		//TODO: 클릭시 모달창 띄워서 상세 페이지 보여주기
	);
}
