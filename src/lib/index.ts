import { enableMapSet } from 'immer';
import { useImmerProduce } from 'use-immer-produce';

enableMapSet();

/**
 * The returned object can be used exactly like a @see Set , maintaining the complete interface.
 * The difference is that the set will be held in state and properly re-render components as required.
 * There are also a few methods added for re-rendering performance reasons.
 *
 * @param initialSet Can be a @see Set or an initialization function that returns a Set.
 */
const useSetAsState = <T>(initialSet: Set<T> | (() => Set<T>)): Set<T> => {
    const [theSet, updateTheSet] = useImmerProduce(initialSet);

    const setAsState: Set<T> = {
        // The unique functionality - new Set() is important for proper re-rendering

        add: (value: T): Set<T> => {
            return updateTheSet((draft) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                draft.add(value);
            });
        },

        clear: (): void => {
            updateTheSet((draft) => {
                draft.clear();
            });
        },

        delete: (value: T): boolean => {
            let deleted = false;
            updateTheSet((draft) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                deleted = draft.delete(value);
            });
            return deleted;
        },

        forEach: (
            callbackfn: (value: T, value2: T, set: Set<T>) => void,
            thisArg?: unknown
        ): void => theSet.forEach(callbackfn, thisArg),

        has: (value: T): boolean => theSet.has(value),

        get size(): number {
            return theSet.size;
        },

        entries: (): IterableIterator<[T, T]> => theSet.entries(),

        keys: (): IterableIterator<T> => theSet.keys(),

        values: (): IterableIterator<T> => theSet.values(),

        // These are internal workings of the Set interface, can mostly ignore.
        [Symbol.iterator]: (): IterableIterator<T> => theSet[Symbol.iterator](),

        get [Symbol.toStringTag]() {
            return theSet[Symbol.toStringTag];
        }
    };

    return setAsState;
};

export default useSetAsState;
