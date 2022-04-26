import "./MyBids.css"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Ethers from '../../../../web3/Ethers';
import Nothing from '../../../landingpage/pages/Nothing';
import SimpleBackdrop from '../../../SimpleBackdrop';

const fakeFetch = (delay = 500) =>
  new Promise((res) => setTimeout(res, delay));

const MyBids = () => {
  const auction = useSelector((state) => state.auction.data);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(async () => {
    setData(await Ethers.getMyBids())
    console.log(await Ethers.getMyBids());
    await fakeFetch()
    setLoading(false)
  }, []);
  if (loading) return <SimpleBackdrop />;
	else
		return (
			<section className="mybids-container">
				{data.length > 0 &&
					data.map((nft, index) => (
						<main
							className="accordion-container"
							key={`mybids-${nft.itemId}-${index}`}
						>
							<Accordion
								className="accordion-box"
								expanded={expanded === `panel${index}`}
								onChange={handleChange(`panel${index}`)}
							>
								<AccordionSummary
                  className="summary-box"
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<div className="image-box">
										<img src={nft.img_file} />
									</div>
									<div>
                    <h1>#{nft.tokenId}</h1>
                  </div>
								</AccordionSummary>
								<AccordionDetails className="details-box">
									
								</AccordionDetails>
							</Accordion>
						</main>
					))}
				{data.length == 0 && (
					<>
						<Nothing />
					</>
				)}
			</section>
		);
};

export default MyBids