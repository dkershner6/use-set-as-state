import React, { useState, ReactElement } from 'react';
import useSetAsState from '..';

interface ISetAsStateComponent {
    onInputAdd?: (added: boolean) => void;
}

export const UseSetAsStateComponent = ({
    onInputAdd
}: ISetAsStateComponent): ReactElement => {
    const [textValue, setTextValue] = useState('test2');
    const setAsState = useSetAsState(new Set(['test', 'test1']));

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
            <div className="container" style={{ display: 'flex' }}>
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
            {setAsState.has('test') && (
                <div data-testid="IDCheck">There is a test button</div>
            )}
            <div
                className="container"
                style={{ display: 'flex', marginTop: '15px' }}
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
            <div className="container" style={{ marginTop: '15px' }}>
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

export default UseSetAsStateComponent;
