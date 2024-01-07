import React, { ReactElement, useState } from "react";

import { render, fireEvent, screen } from "@testing-library/react";

import { useSetAsState } from ".";

interface ISetAsStateComponent {
    onInputAdd?: (added: boolean) => void;
}

const UseSetAsStateComponent = ({
    onInputAdd,
}: ISetAsStateComponent): ReactElement => {
    const [textValue, setTextValue] = useState("test2");
    const setAsState = useSetAsState(() => new Set(["test", "test1"]));

    const generateItems = (number: number): string[] => {
        const result = [];
        for (let index = 0; index < number; index++) {
            result.push(`bulkLoad${index}`);
        }
        return result;
    };

    const handleAddABunch = (number: number): void => {
        const items = generateItems(number);
        items.forEach((item) => setAsState.add(item));
    };

    const handleDeleteABunch = (number: number): void => {
        const items = generateItems(number);
        items.forEach((item) => setAsState.delete(item));
    };

    const handleAddInput = (): void => {
        const localSet = setAsState.add(textValue);
        if (onInputAdd) onInputAdd(localSet.has(textValue));
    };

    return (
        <>
            <div className="container" style={{ display: "flex" }}>
                <button
                    data-testid="AddItemsBulkButton"
                    onClick={() => handleAddABunch(50)}
                >
                    Add a Bunch of Items
                </button>
                <button
                    data-testid="DeleteItemsBulkButton"
                    onClick={() => handleDeleteABunch(50)}
                >
                    Clear the Bunch of Items you Added
                </button>
                <button
                    data-testid="ClearButton"
                    onClick={() => setAsState.clear()}
                >
                    Clear All Items
                </button>
            </div>
            <div data-testid="ButtonCount">
                There are {setAsState.size} Buttons
            </div>
            {setAsState.has("test") && (
                <div data-testid="IDCheck">There is a test button</div>
            )}
            <div
                className="container"
                style={{ display: "flex", marginTop: "15px" }}
            >
                <input
                    type="text"
                    value={textValue}
                    data-testid="Input"
                    onChange={(e) => setTextValue(e.target.value)}
                />
                <button
                    data-testid="AddButton"
                    onClick={() => handleAddInput()}
                >
                    Add
                </button>
            </div>
            <div className="container" style={{ marginTop: "15px" }}>
                <p>Click the Buttons themselves to delete one by one.</p>
                {[...setAsState.keys()].map((aString) => (
                    <div key={aString}>
                        <button
                            data-testid={`ListItem-${aString}`}
                            onClick={() => setAsState.delete(aString)}
                        >
                            {aString}
                        </button>
                    </div>
                ))}
            </div>
            <div data-testid="toStringCheck">{setAsState.toString()}</div>
        </>
    );
};

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
