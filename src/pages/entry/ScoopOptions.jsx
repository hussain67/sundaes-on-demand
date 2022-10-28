import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderTetails } from "../../contexts/OrderDetails";
import { useState } from "react";

export default function ScoopOption({ name, imagePath }) {
	const { updateItemCount } = useOrderTetails();
	const [isValidInput, setIsValidInput] = useState(true);

	const handleChange = e => {
		console.log(e.target.value);
		if (parseInt(e.target.value) < 0) {
			setIsValidInput(false);
		} else {
			setIsValidInput(true);
		}
		if (isValidInput) {
			console.log(e.target.value);
			updateItemCount(name, parseInt(e.target.value), "scoops");
		}
	};

	return (
		<Col style={{ textAlign: "center" }}>
			<img
				style={{ width: "75%" }}
				src={`http://localhost:3030/${imagePath}`}
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
						className={isValidInput ? "" : "is-invalid"}
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
		</Col>
	);
}
