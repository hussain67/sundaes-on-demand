import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
	render(<Options optionType={"scoops"} />);

	//Make sure that total starts out $0.00
	const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
	expect(scoopsSubtotal).toHaveTextContent("0.00");

	//update vanila scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
	await userEvent.clear(vanillaInput);
	await userEvent.type(vanillaInput, "1");
	expect(scoopsSubtotal).toHaveTextContent("2.00");

	//update chocolet scoop to 2 and check the subtotal
	const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
	userEvent.clear(chocolateInput);

	userEvent.type(chocolateInput, "2");
	expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
	render(<Options optionType={"toppings"} />);

	//make sure that topping subtotal starts with 0.00
	const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
	expect(toppingsSubtotal).toHaveTextContent("0.00");

	//Add Cherries and check the subtotal
	const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
	await userEvent.click(cherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("1.50");

	// add Hot Fudge and check subtotal
	const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge" });
	await userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("3.00");

	// Remove Hot Fudge and check subtotal
	await userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
	test("grand total updates properly if scoop is added first", async () => {
		render(<OrderEntry />);
		const grandTotal = screen.getByText("Grand total: $", { exact: false });
		//"grand total starts at $0.00
		expect(grandTotal).toHaveTextContent("$0.00");
		//update vanila scoops to 1 and check the grand total
		const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
		await userEvent.clear(vanillaInput);
		await userEvent.type(vanillaInput, "1");
		expect(grandTotal).toHaveTextContent("$2.00");

		//Add Cherries topping and check the grand total
		const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
		await userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent("$3.50");
	});
	test("grand total updates properly if toppings is added first", async () => {
		render(<OrderEntry />);
		const grandTotal = screen.getByText("Grand total: $", { exact: false });

		//Add Cherries topping and check the grand total
		const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
		await userEvent.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent("$1.50");

		//update vanila scoops to 1 and check the grand total
		const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
		await userEvent.clear(vanillaInput);
		await userEvent.type(vanillaInput, "1");
		expect(grandTotal).toHaveTextContent("$3.50");
	});

	test("grand total updates properly if a item is removed", async () => {
		render(<OrderEntry />);
		const grandTotal = screen.getByText("Grand total: $", { exact: false });

		//Add Cherries topping and check the grand total
		const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
		await userEvent.click(cherriesCheckbox);

		//update vanila scoops to 1 and check the grand total
		const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
		await userEvent.clear(vanillaInput);
		await userEvent.type(vanillaInput, "1");

		//remove Cherries topping and check the grand total

		await userEvent.click(cherriesCheckbox);

		expect(grandTotal).toHaveTextContent("$2.00");
	});
});
