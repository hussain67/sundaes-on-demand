import { useOrderTetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

export default function OrderSummery() {
	const { totals, optionCounts } = useOrderTetails();

	const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate, 2"], ["vanila", 1]]
	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{value}
			{key}
		</li>
	));

	const toppingArray = Object.keys(optionCounts.toppings);
	const toppingList = toppingArray.map(key => <li key={key}>{key}</li>);
	return (
		<div>
			<h1>Order Summery</h1>
			<h2>Scoops: {formatCurrency(totals.scoops)}</h2>
			<ul>{scoopList}</ul>
			<h2>Toppings: {formatCurrency(totals.toppings)}</h2>
			<ul>{toppingList}</ul>
			<SummaryForm />
		</div>
	);
}
