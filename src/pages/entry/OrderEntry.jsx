import { useOrderTetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
	const { totals } = useOrderTetails();
	const disabled = totals.scoops <= 0;

	return (
		<div>
			<Options optionType={"scoops"} />
			<Options optionType={"toppings"} />
			<h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
			<button
				disabled={disabled}
				onClick={() => setOrderPhase("review")}
			>
				Submit order
			</button>
		</div>
	);
}
