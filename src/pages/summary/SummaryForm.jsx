import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SummaryForm = ({ setOrderPhase }) => {
	const [tcChecked, setTcChecked] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setOrderPhase("completed");
	}

	const checkboxLabel = (
		<span>
			I agree to
			<span style={{ color: "blue" }}>Terms and Conditions</span>
		</span>
	);
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="terms-and-condition">
					<Form.Check
						type="checkbox"
						checked={tcChecked}
						onChange={e => {
							setTcChecked(e.target.checked);
						}}
						label={checkboxLabel}
					></Form.Check>
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					disabled={!tcChecked}
				>
					Confirm order
				</Button>
			</Form>
		</>
	);
};

export default SummaryForm;
