import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useOrderTetails } from "../../contexts/OrderDetails";
import AlertBanner from "../commons/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
	const [orderNumber, setOrderNumber] = useState(null);
	const [error, setError] = useState(null);
	const { resetOrder } = useOrderTetails();
	//console.log(orderNumber);
	useEffect(() => {
		axios
			.post("http://localhost:3030/order")
			.then(response => {
				setOrderNumber(response.data.orderNumber);
			})
			.catch(error => setError(true));
	}, []);
	function handleClick() {
		resetOrder();
		setOrderPhase("inProgress");
	}

	const newOrderButton = <Button onClick={handleClick}>Create new order</Button>;

	if (error) {
		return (
			<>
				<AlertBanner
					message={null}
					variant={null}
				/>
				{newOrderButton}
			</>
		);
	}

	return (
		<>
			{orderNumber && (
				<div>
					<h1>Thank You</h1>
					<h2>Your order number is {orderNumber}</h2>
					<p>As per terms and conditions .....</p>
					{newOrderButton}
				</div>
			)}
			{!orderNumber && (
				<div>
					<h2>Loading...</h2>
				</div>
			)}
		</>
	);
}
