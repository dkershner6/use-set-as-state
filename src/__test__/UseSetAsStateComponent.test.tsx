import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import UseSetAsStateComponent from "./UseSetAsStateComponent";

describe("useSetAsState", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it("Should render", () => {
        render(<UseSetAsStateComponent />);

        expect(true).toBeTruthy();
    });

    it("Should initially render with 2 items in the Set", () => {
        const { queryAllByTestId } = render(<UseSetAsStateComponent />);

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);
    });

    it("Should match Button count and actual count", () => {
        const { getByTestId, queryAllByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        expect(getByTestId("ButtonCount").innerHTML).toEqual(
            "There are 2 Buttons",
        );
    });

    it("Should find the test button initially", () => {
        const { getByTestId } = render(<UseSetAsStateComponent />);

        expect(getByTestId("IDCheck")).toBeInTheDocument();
    });

    it("Should add a third item when Add is clicked", () => {
        const { getByTestId, queryAllByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const addButton = getByTestId("AddButton");
        fireEvent.click(addButton);

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(3);
    });

    it("Should delete an item when clicked", () => {
        const { getByTestId, queryAllByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const listItem = getByTestId("ListItem-test");
        fireEvent.click(listItem);

        const listItems = queryAllByTestId("ListItem-test");
        expect(listItems).toHaveLength(0);
    });

    it("Should clear all items when ClearButton is clicked", () => {
        const { queryAllByTestId, getByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const clearButton = getByTestId("ClearButton");
        fireEvent.click(clearButton);

        const afterClickListItems = queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(0);
    });

    it("Should load a bunch of items at once when AddBulk is clicked", () => {
        const { queryAllByTestId, getByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const addBulkButton = getByTestId("AddItemsBulkButton");
        fireEvent.click(addBulkButton);

        const afterClickListItems = queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(52);
    });

    it("Should load a bunch of items at once when AddBulk is clicked, then delete them when DeleteBulk is clicked", () => {
        const { queryAllByTestId, getByTestId } = render(
            <UseSetAsStateComponent />,
        );

        const listItems = queryAllByTestId(/ListItem/);
        expect(listItems).toHaveLength(2);

        const addBulkButton = getByTestId("AddItemsBulkButton");
        fireEvent.click(addBulkButton);

        const afterClickListItems = queryAllByTestId(/ListItem/);
        expect(afterClickListItems).toHaveLength(52);

        const deleteBulkButton = getByTestId("DeleteItemsBulkButton");
        fireEvent.click(deleteBulkButton);

        const afterDeleteListItems = queryAllByTestId(/ListItem/);
        expect(afterDeleteListItems).toHaveLength(2);
    });

    it("Should populate toString()", () => {
        const { getByTestId } = render(<UseSetAsStateComponent />);

        expect(getByTestId("toStringCheck").innerHTML.length).toBeGreaterThan(
            0,
        );
    });

    it("Should return immediately with the new addition when added", () => {
        const onInputAdd = jest.fn();
        const { getByTestId } = render(
            <UseSetAsStateComponent onInputAdd={onInputAdd} />,
        );

        const addButton = getByTestId("AddButton");
        fireEvent.click(addButton);

        expect(onInputAdd).toHaveBeenLastCalledWith(true); //True means the value was immediately present
    });
});
