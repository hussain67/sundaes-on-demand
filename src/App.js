import Container from "react-bootstrap/Container";

import "./App.css";
import { OrderDetailsProvider } from "./contexts/OrderTotails";
import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
	return (
		<Container>
			<OrderDetailsProvider>
				{/* Summery page and OrderEntry page need provider */}
				<OrderEntry />
			</OrderDetailsProvider>
		</Container>
	);
}

export default App;
