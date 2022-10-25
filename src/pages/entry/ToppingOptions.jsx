import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useOrderTetails } from "../../contexts/OrderDetails";

export default function ToppingOption({ name, imagePath }) {
	const { updateItemCount } = useOrderTetails();
	const handleChange = e => {
		updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
	};
	return (
		<Col style={{ textAlign: "center" }}>
			<img
				style={{ width: "75%" }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
			/>
			<Form.Group controlId={`${name}-topping-checkbox`}>
				<Form.Check
					type="checkbox"
					onChange={handleChange}
					label={name}
				/>
			</Form.Group>
		</Col>
	);
}
