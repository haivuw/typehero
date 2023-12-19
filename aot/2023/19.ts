// https://typehero.dev/challenge/day-19
import { Expect, Equal } from '@type-challenges/utils'

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>
// prettier-ignore
type test_0_expected =  [
  '🛹', '🛹',
	'🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>
// prettier-ignore
type test_1_expected = [
	'🛹', '🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴',
	'🏄',
	'🛹', '🛹',
	'🚲',
	'🛴', '🛴'
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>
// prettier-ignore
type test_2_expected = [
	'🛹', '🛹',
	'🚲', '🚲', '🚲',
	'🛴', '🛴', '🛴',
	'🏄', '🏄', '🏄', '🏄', '🏄',
	'🛹',
	'🚲',
	'🛴', '🛴',
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>

type _Toys = ['🛹', '🚲', '🛴', '🏄']

type Rebuild<List, Toys extends _Toys[number][] = _Toys> = List extends (
  [infer First, ...infer Rest]
) ?
  [...Multiply<Toys[0], First>, ...Rebuild<Rest, Circle<Toys>>]
: []

type Circle<T> = T extends [infer First, ...infer Rest] ? [...Rest, First] : T

type Multiply<Toy, N, Acc extends unknown[] = []> = Acc['length'] extends N ?
  Acc
: Multiply<Toy, N, [...Acc, Toy]>
