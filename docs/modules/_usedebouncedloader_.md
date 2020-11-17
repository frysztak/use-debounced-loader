**[use-debounced-loader](../README.md)**

# Module: "useDebouncedLoader"

## Index

### Functions

* [useDebouncedLoader](_usedebouncedloader_.md#usedebouncedloader)

## Functions

### useDebouncedLoader

▸ **useDebouncedLoader**(`isLoading`: boolean, `initialDelay?`: number, `minimalTimeOn?`: number): boolean

*Defined in useDebouncedLoader.ts:48*

Debounces `isLoading` input. If `isLoading` remains `true` for at least `initialDelay` miliseconds, this hook
will returns `true` for `minimalTimeOn` miliseconds.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`isLoading` | boolean | - | Input signal you wish to debounce (usually it connects to a spinner and indicates a pending operation) |
`initialDelay` | number | 400 | Delay in miliseconds. Requests shorter than `initialDelay` will be ignored. |
`minimalTimeOn` | number | 400 | Once spinner appears, it will stay on screen for a least `minimalTimeOn` miliseconds. |

**Returns:** boolean

Debounced `isLoading` signal
