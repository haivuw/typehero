// https://typehero.dev/challenge/drop-string

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
  >,
  Expect<
    Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>
  >,
]

type DropString<S, R extends string> = S extends `${infer First}${infer Rest}` ?
  First extends ToUnion<R> ?
    DropString<Rest, R>
  : `${First}${DropString<Rest, R>}`
: ''

type ToUnion<S extends string> =
  S extends `${infer First}${infer Rest}` ? First | ToUnion<Rest> : never

type testToUnion = ToUnion<'asd'>
type test = 'a' extends ToUnion<'asd'> ? 1 : 0
type test2 = DropString<'butter fly!', 'but'>
