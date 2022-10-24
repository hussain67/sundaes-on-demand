import { useState, createContext, useContext } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//create custom hooks
export function useOrderTetails() {
	const contextValue = useContext(OrderDetails);
	if (!contextValue) {
		throw new Error("useOrderDetails must be called from within an OrderDetailsProvider");
	}
	return contextValue;
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: {}, //{chocolate: 1, vanila:2}
		toppings: {} //{"Gummi Bears: 1"}
	});
	function updateItemCount(itemName, newItemCount, optionType) {
		//make acopy of existing state
		const newOptionCounts = { ...optionCounts };

		//update the copy with new information
		newOptionCounts[optionType][itemName] = newItemCount;

		//update the state with the updated copy
		setOptionCounts(newOptionCounts);
	}

	function resetOrder() {
		setOptionCounts({ scoops: {}, toppings: {} });
	}

	//utility function to derive totals from optionCount state value
	function calculateTotal(optionType) {
		//get an array of counts for the option type for example [1, 2]
		const countArray = Object.values(optionCounts[optionType]);

		// total the value in the array of counts for the number of items
		const totalCount = countArray.reduce((total, value) => total + value, 0);

		//multiply the total number of items by the price for this item type

		return totalCount * pricePerItem[optionType];
	}

	const totals = {
		scoops: calculateTotal("scoops"),
		toppings: calculateTotal("toppings")
	};

	const value = { optionCounts, updateItemCount, resetOrder, totals };
	return (
		<OrderDetails.Provider
			value={value}
			{...props}
		/>
	);
}
