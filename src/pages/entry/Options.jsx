import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import { pricePerItem } from "../../constants";
import AlertBanner from "../commons/AlertBanner";
import ScoopOption from "./ScoopOptions";
import ToppingOption from "./ToppingOptions";
import { formatCurrency } from "../../utilities";
import { useOrderTetails } from "../../contexts/OrderTotails";

export default function Options({ optionType }) {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const { totals } = useOrderTetails();

	useEffect(() => {
		axios
			.get(`http://localhost:3030/${optionType}`)
			.then(response => {
				setItems(response.data);
			})
			.catch(error => {
				setError(true);
			});
	}, [optionType]);

	if (error) {
		return <AlertBanner />;
	}
	const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
	const title = optionType[0].toUpperCase() + optionType.slice(0).toLowerCase();
	const optionItems = items.map(item => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	));
	return (
		<>
			<Row>
				<h2>{title}</h2>
				<p>{formatCurrency(pricePerItem[optionType])} each</p>
				<p>
					{title} total: {formatCurrency(totals[optionType])}
				</p>
				{optionItems}
			</Row>
			;
		</>
	);
}
