// https://typehero.dev/challenge/day-15
import { Expect, Equal } from '@type-challenges/utils'

type test_doll_actual = BoxToys<'doll', 1>
//   ^?
type test_doll_expected = ['doll']
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>

type test_nutcracker_actual = BoxToys<'nutcracker', 3 | 4>
//   ^?
type test_nutcracker_expected =
  | ['nutcracker', 'nutcracker', 'nutcracker']
  | ['nutcracker', 'nutcracker', 'nutcracker', 'nutcracker']
type test_nutcracker = Expect<
  Equal<test_nutcracker_expected, test_nutcracker_actual>
>

type CreateArray<
  Length,
  Item,
  Acc extends Item[] = [],
> = Acc['length'] extends Length ? Acc
: CreateArray<Length, Item, [...Acc, Item]>

type BoxToys<T, U> = U extends U ? CreateArray<U, T> : never
