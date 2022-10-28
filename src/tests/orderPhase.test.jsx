import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
const user = userEvent.setup();
test("order phases for happy path", async () => {
	// render app
	render(<App />);

	// add ice cream scoops and toppings
	const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
	await user.clear(vanillaInput);
	await user.type(vanillaInput, "1");

	const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
	await user.click(cherriesCheckbox);

	// find and click order button
	const orderButton = await screen.findByRole("button", { name: "Submit order" });
	user.click(orderButton);

	//check summery information based on order
	await screen.findByText("Order Summery");

	//accept terms and conditions and click button to confirm order
	const tcCheckbox = await screen.findByRole("checkbox", { name: /terms and conditions/i });
	await user.click(tcCheckbox);
	const confirmOrderButton = await screen.findByRole("button", {
		name: /confirm order/i
	});
	await user.click(confirmOrderButton);

	//Text Loadding... should appear
	const loadingtext = await screen.findByText(/loading.../i);
	expect(loadingtext).toBeInTheDocument();

	// confirm order number on confirmation page
	const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i });
	expect(thankYouHeader).toBeInTheDocument();

	//Loading should disappear
	const notLoading = screen.queryByText(/loading.../i);
	expect(notLoading).not.toBeInTheDocument();

	//click "new order" button on confirmation page
	const newOrderButton = await screen.findByRole("button", { name: /create new order/i });
	await user.click(newOrderButton);
	// Check that scoops and toppings subtotals have been updated

	// wait for items to appear so that Testing Library doesn't get angry about stuff
	// happening after test is over
	await screen.findByRole("spinbutton", { name: "Vanilla" });
	await screen.findByRole("checkbox", { name: "Cherries" });
});

test("conditional rendering for toppings", async () => {
	render(<App />);

	// add ice cream scoops but no toppings
	const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
	await user.clear(vanillaInput);
	await user.type(vanillaInput, "1");

	// find and click order button
	const orderButton = await screen.findByRole("button", { name: "Submit order" });
	user.click(orderButton);

	//check that scoop is included
	const scoops = await screen.findByText(/scoops:/i);
	expect(scoops).toBeInTheDocument();

	//check that topping is not present in order summery page
	const noTopping = screen.queryByText(/toppings:/i);
	expect(noTopping).not.toBeInTheDocument();
});
