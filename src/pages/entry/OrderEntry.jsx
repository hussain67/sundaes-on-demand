import { useEffect, useState } from "react";
import { useOrderTetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry() {
	const [grandTotal, setGrandTotal] = useState("$0.00");

	const { totals } = useOrderTetails();

	useEffect(() => {
		setGrandTotal(formatCurrency(totals.scoops + totals.toppings));
	}, [totals]);

	return (
		<div>
			<Options optionType={"scoops"} />
			<Options optionType={"toppings"} />
			<h2>Grand total: {grandTotal}</h2>
		</div>
	);
}
