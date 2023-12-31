# useSetAsState

A React Hook to use JavaScript's Set as React State, using an identical interface. Uses Immer under the hood.

This is a very lightweight package, it only depends on one other, extremely lightweight React hook (besides Immer itself).

Total package size is ~3KB including TypeScript types.

## Docs

[API Docs](https://dkershner6.github.io/use-set-as-state/)

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

## Contributing

All contributions are welcome, please open an issue or pull request.

To use this repository:
1. `npm i -g pnpm` (if don't have pnpm installed)
2. `pnpm i`
3. `npx projen` (this will ensure everything is setup correctly, and you can run this command at any time)
4. Good to make your changes!
5. You can run `npx projen build` at any time to build the project.