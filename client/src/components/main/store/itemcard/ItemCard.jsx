import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ItemCard.css";
import ItemModal from "./ItemModal";
import { CardContent, Typography } from "@mui/material";

export default function ItemCard(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	return (
		<>
			<Card className="itemCard" onClick={handleOpen}>
				<CardHeader
					title={`${props.title} #${props.tokenId}`}
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
      <ItemModal open={open} handleClose={handleClose} itemInfo={props} />
		</>
	);
}
