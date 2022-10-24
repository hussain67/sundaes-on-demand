import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderTetails } from "../../contexts/OrderTotails";

export default function ScoopOption({ name, imagePath }) {
	const { updateItemCount } = useOrderTetails();

	const handleChange = e => updateItemCount(name, parseInt(e.target.value), "scoops");

	return (
		<Col style={{ textAlign: "center" }}>
			<img
				style={{ width: "75%" }}
				src={`http:localhost:3000/${imagePath}`}
				alt={`${name} scoop`}
			/>
			<Form.Group
				controlId={`${name}-count`}
				as={Row}
				style={{ marginTop: "10px" }}
			>
				<Form.Label
					column
					xs="6"
					style={{ textAlign: "right" }}
				>
					{name}
				</Form.Label>
				<Col
					xs="5"
					style={{ textAlign: "left" }}
				>
					<Form.Control
						type="number"
						defaultValue={0}
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
		</Col>
	);
}
