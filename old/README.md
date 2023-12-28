# useSetAsState

A React Hook to use JavaScript's Set as React State, using an identical interface. Uses Immer under the hood.

This is a very lightweight package, it only depends on one other, extremely lightweight React hook (besides Immer itself).

Total package size is ~3KB including TypeScript types.

## Installation

```
npm i use-set-as-state immer
```

## Usage

```typescript
import { useSetAsState } from 'use-set-as-state';

const FunctionComponent = () => {
    const theSet = useSetAsState(new Set());

    const onClick = () => {
        theSet.add('checkboxChecked');
    };

    return <input type="checkbox" checked={theSet.has('checkboxChecked')}>;
};
```

Note: The `add` function returns the NEXT (Draft) state, even if the render has not occurred yet.

```typescript
const onClick = () => {
    const draft = theSet.add('header');

    console.log(draft.has('header')); // true
};
```
