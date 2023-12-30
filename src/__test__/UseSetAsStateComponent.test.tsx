import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";

import UseSetAsStateComponent from "./UseSetAsStateComponent";

describe("useSetAsState", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should render", () => {
        render(<UseSetAsStateComponent />);

        expect(true).toBeTruthy();
    });

    it("Should initially render with 2 items in the Set", () => {
        render(<UseSetAsStateComponent />);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);
    });

    it("Should match Button count and actual count", () => {
        render(<UseSetAsStateComponent />);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        expect(screen.getByTestId("ButtonCount").innerHTML).toEqual(
            "There are 2 Buttons",
        );
    });

    it("Should find the test button initially", () => {
        render(<UseSetAsStateComponent />);

        expect(screen.getByTestId("IDCheck")).toBeInTheDocument();
    });

    it("Should add a third item when Add is clicked", () => {
        render(<UseSetAsStateComponent />);

        const addButton = screen.getByTestId("AddButton");
        fireEvent.click(addButton);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(3);
    });

    it("Should delete an item when clicked", () => {
        render(<UseSetAsStateComponent />);

        const listItem = screen.getByTestId("ListItem-test");
        fireEvent.click(listItem);

        const listItems = screen.queryAllByTestId("ListItem-test");
        expect(listItems).toHaveLength(0);
    });

    it("Should clear all items when ClearButton is clicked", () => {
        render(<UseSetAsStateComponent />);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const clearButton = screen.getByTestId("ClearButton");
        fireEvent.click(clearButton);

        const afterClickListItems = screen.queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(0);
    });

    it("Should load a bunch of items at once when AddBulk is clicked", () => {
        render(<UseSetAsStateComponent />);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const addBulkButton = screen.getByTestId("AddItemsBulkButton");
        fireEvent.click(addBulkButton);

        const afterClickListItems = screen.queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(52);
    });

    it("Should load a bunch of items at once when AddBulk is clicked, then delete them when DeleteBulk is clicked", () => {
        render(<UseSetAsStateComponent />);

        const listItems = screen.queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const addBulkButton = screen.getByTestId("AddItemsBulkButton");
        fireEvent.click(addBulkButton);

        const afterClickListItems = screen.queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(52);

        const deleteBulkButton = screen.getByTestId("DeleteItemsBulkButton");
        fireEvent.click(deleteBulkButton);

        const afterDeleteListItems = screen.queryAllByTestId(/ListItem/);
        expect(afterDeleteListItems).toHaveLength(2);
    });

    it("Should populate toString()", () => {
        render(<UseSetAsStateComponent />);

        expect(
            screen.getByTestId("toStringCheck").innerHTML.length,
        ).toBeGreaterThan(0);
    });

    it("Should return immediately with the new addition when added", () => {
        const onInputAdd = jest.fn();
        render(<UseSetAsStateComponent onInputAdd={onInputAdd} />);

        const addButton = screen.getByTestId("AddButton");
        fireEvent.click(addButton);

        expect(onInputAdd).toHaveBeenLastCalledWith(true); //True means the value was immediately present
    });
});
