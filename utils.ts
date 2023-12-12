export type Includes<T, Item> =
  T extends [infer First, ...infer Rest] ?
    First extends Item ?
      true
    : Includes<Rest, Item>
  : false

export type ConcatIfNotFound<T extends unknown[], Item> = Includes<
  T,
  Item
> extends true ?
  T
: [...T, Item]

export type Prettify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
}

type pretty = Prettify<{ k1: 'v1' } & { k2: 'v2' }>

export type And<A, B> =
  A extends true ?
    B extends true ?
      true
    : false
  : false

type testAnd = And<true, false>
type testAnd1 = And<true, true>

export type Or<A, B> =
  A extends true ? true
  : B extends true ? true
  : false

type testOr = Or<true, false>
type testOr1 = Or<false, false>

// want empty to be last case
export type NotEmpty<S extends string> = S extends '' ? false : true
