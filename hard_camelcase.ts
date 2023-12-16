// https://typehero.dev/challenge/camelcase

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

type CamelCase<S extends string> =
  // first + second
  S extends `${infer First}${infer Second}${infer Rest}` ?
    IsSpace<Second> extends true ?
      // any + space
      `${Lowercase<First>}${CamelCase<`${Second}${Rest}`>}`
    : IsSpace<First> extends true ?
      // space + !space
      IsAlphabet<Second> extends true ?
        // space + alpha
        `${Uppercase<Second>}${CamelCase<`${Rest}`>}`
      : // space + !(space || alpha)
        `${First}${Second}${CamelCase<Rest>}`
    : // !space + !space
      `${Lowercase<First>}${CamelCase<`${Second}${Rest}`>}`
  : Lowercase<S>

type IsSpace<C extends string> = C extends '_' | '-' ? true : false
type IsAlphabet<C extends string> =
  Uppercase<C> extends Lowercase<C> ? false : true
