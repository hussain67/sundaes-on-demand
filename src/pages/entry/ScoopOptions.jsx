import Col from "react-bootstrap/Col";

export default function ScoopOption({ name, imagePath }) {
	return (
		<Col style={{ textAlign: "center" }}>
			<img
				style={{ width: "75%" }}
				src={`http:localhost:3000/${imagePath}`}
				alt={`${name} scoop`}
			/>
		</Col>
	);
}
