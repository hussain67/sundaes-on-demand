import { useOrderTetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

export default function OrderSummery({ setOrderPhase }) {
	const { totals, optionCounts } = useOrderTetails();

	const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate, 2"], ["vanila", 1]]
	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{value}
			{key}
		</li>
	));

	//only display topping if topping total is greater than zero
	const hasToppings = totals.toppings > 0;
	let toppingDisplay = null;

	if (hasToppings) {
		const toppingArray = Object.keys(optionCounts.toppings);
		const toppingList = toppingArray.map(key => <li key={key}>{key}</li>);

		toppingDisplay = (
			<h2>
				Toppings: {formatCurrency(totals.toppings)}
				<ul>{toppingList}</ul>
			</h2>
		);
	}

	return (
		<div>
			<h1>Order Summery</h1>
			<h2>Scoops: {formatCurrency(totals.scoops)}</h2>
			<ul>{scoopList}</ul>

			{toppingDisplay}

			<h2>Totals: {formatCurrency(totals.scoops + totals.toppings)}</h2>
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	);
}
