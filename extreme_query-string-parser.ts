// https://typehero.dev/challenge/query-string-parser
import type { Equal, Expect } from '@type-challenges/utils'
import { ConcatIfNotFound, NotEmpty, Prettify } from './utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  // 2
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  // 3
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  // 5
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  // 6
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  // 7
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  // 8
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  // 9
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  // 10
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>,
      { k1: ['v1', 'v2']; k2: 'v1' }
    >
  >,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
      { k1: ['v1', 'v2', 'v3']; k2: 'v2' }
    >
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]

type test0 = ParseQueryString<''>
type test1 = ParseQueryString<'k1'>
type test2 = ParseQueryString<'k1&k1'>
type test3 = ParseQueryString<'k1&k2'>
type test4 = ParseQueryString<'k1=v1'>
type test5 = ParseQueryString<'k1=v1&k1=v2'> //
type test6 = ParseQueryString<'k1=v1&k2=v2'>
type test7 = ParseQueryString<'k1=v1&k2=v2&k1=v2'>
type test8 = ParseQueryString<'k1=v1&k2'>
type test9 = ParseQueryString<'k1=v1&k1=v1'>
type test10 = ParseQueryString<'k1=v1&k1=v2&k1=v1'>
type test11 = ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>
type test12 = ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>
type test13 = ParseQueryString<'k1=v1&k1'>
type test14 = ParseQueryString<'k1&k1=v1'>

type Merge<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
> = Omit<A, keyof B> & {
  [K in keyof B]: K extends keyof A ?
    B[K] extends A[K] ? A[K]
    : A[K] extends unknown[] ? ConcatIfNotFound<A[K], B[K]>
    : [A[K], B[K]]
  : B[K]
}

type ParseQueryString<
  S extends string,
  Acc extends Record<string, unknown> = {},
> = Prettify<
  // match K = V & -> recur
  S extends `${infer K}=${infer V}&${infer Rest}` ?
    ParseQueryString<Rest, Merge<Acc, Record<K, V>>>
  : // match K & -> recur
  S extends `${infer K}&${infer Rest}` ?
    ParseQueryString<Rest, Merge<Acc, Record<K, true>>>
  : // match K = V -> return
  S extends `${infer K}=${infer V}` ? Merge<Acc, Record<K, V>>
  : // match K -> return
  NotEmpty<S> extends true ? Merge<Acc, Record<S, true>>
  : Acc
>
