// https://typehero.dev/challenge/printf

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

type TypeMap = {
  s: string
  d: number
}

type Format<S extends string> =
  // escape %
  S extends `${any}%%${infer Rest}` ? Format<Rest>
  : S extends `${any}%${infer Key}${infer Rest}` ?
    Key extends keyof TypeMap ?
      (arg: TypeMap[Key]) => Format<Rest>
    : Format<Rest>
  : string
