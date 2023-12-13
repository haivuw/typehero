// https://typehero.dev/challenge/isany

import type { Equal, Expect } from '@type-challenges/utils'
import { IsNever, IsUnion } from './utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]

type IsAny<T> =
  IsNever<T> extends true ? false
  : // (any extends undefined) returns a union.
  IsUnion<T extends 'whatever' ? 1 : 0> extends true ? true
  : false
