import { useState } from "react";
import Container from "react-bootstrap/Container";

import "./App.css";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummery from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
	//orderPhase needs to be 'inProgress', 'review' or 'complete
	const [orderPhase, setOrderPhase] = useState("inProgress");

	let Component = OrderEntry;
	switch (orderPhase) {
		case "inProgress":
			Component = OrderEntry;
			break;
		case "review":
			Component = OrderSummery;
			break;
		case "completed":
			Component = OrderConfirmation;
			break;
		default:
	}

	return (
		<Container>
			<OrderDetailsProvider>
				{/* Summery page and OrderEntry page need provider */}
				<Component setOrderPhase={setOrderPhase} />
			</OrderDetailsProvider>
		</Container>
	);
}

export default App;
