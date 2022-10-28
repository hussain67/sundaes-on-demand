import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
	render(<Options optionType="scoops" />);

	//find images
	const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

	expect(scoopImages).toHaveLength(2);

	//confirm alt text of img
	const altText = scoopImages.map(element => element.alt);

	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each topping option from server", async () => {
	render(<Options optionType="toppings" />);
	//find image
	const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });

	expect(toppingImages).toHaveLength(3);

	//confirm alt text of image
	const altText = toppingImages.map(element => element.alt);
	expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("Should test the red color appear for invalid input", async () => {
	render(<Options optionType="scoops" />);

	//update vanila scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
	await userEvent.clear(vanillaInput);
	await userEvent.type(vanillaInput, "-1");

	expect(vanillaInput).toHaveClass("is-invalid");
});
