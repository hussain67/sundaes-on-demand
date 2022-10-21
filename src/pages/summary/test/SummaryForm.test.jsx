import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checkbox functionality", () => {
	render(<SummaryForm />);
	const checkBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
	const saveButton = screen.getByRole("button", { name: "Confirm order" });
	expect(checkBox).not.toBeChecked();
	fireEvent.click(checkBox);

	expect(saveButton).toBeEnabled();
});
