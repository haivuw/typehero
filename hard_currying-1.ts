// https://typehero.dev/challenge/currying-1

import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean,
  ) => true,
)
const curried3 = Currying(() => true)

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string,
      ) => (
        b: number,
      ) => (
        c: boolean,
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>,
]

type RecursiveCurriedFn<Args extends unknown[], Result> = (
  args: Args[0],
) => Args extends [Args[0]] ? Result
: RecursiveCurriedFn<
    Args extends [unknown, ...infer Rest] ? Rest : never,
    Result
  >

declare function Currying<Fn>(
  // inferring Result through generic widens the type of true to boolean, so instead infer the whole Fn
  fn: Fn,
): Fn extends (...args: infer Args) => infer Result ?
  Args extends [] ?
    () => Result
  : RecursiveCurriedFn<Args, Result>
: never
