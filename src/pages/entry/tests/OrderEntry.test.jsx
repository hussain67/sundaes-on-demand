import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("handle errors for scoop and toppings routes", async () => {
	server.resetHandlers(
		rest.get("http://localhost:3030/scoops", (req, res, ctx) => res(ctx.status(500))),
		rest.get("http://localhost:3030/toppings", (req, res, ctx) => res(ctx(500)))
	);
	render(<OrderEntry />);
	await waitFor(async () => {
		const alerts = await screen.findAllByRole("alert");
		expect(alerts).toHaveLength(2);
	});
});

test("disable order button if no scoop is added", async () => {
	render(<OrderEntry />);
	const orderButton = await screen.findByRole("button", { name: /submit order/i });
	expect(orderButton).toBeDisabled();

	//update vanila scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
	await userEvent.clear(vanillaInput);
	await userEvent.type(vanillaInput, "1");
	expect(orderButton).toBeEnabled();
});
