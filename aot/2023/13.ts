// https://typehero.dev/challenge/day-13
// it's ugly but it works

import { Expect, Equal } from '@type-challenges/utils'

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type test_0_actual = DayCounter<1, 12>
//   ^?
type test_0_expected = TwelveDaysOfChristmas
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>

// prettier-ignore
type DaysUntilChristmas =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25;

type test_1_actual = DayCounter<1, 25>
//   ^?
type test_1_expected = DaysUntilChristmas
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>

type RecursiveCounter<
  Start extends number,
  End extends number,
  Counter extends number[] = [],
  // accumulated days (union)
  Acc = never,
  // signal whether we've passed the start
  Started = false,
> = Counter['length'] extends Start ?
  // start
  RecursiveCounter<Start, End, [...Counter, Counter['length']], Acc, true>
: Started extends true ?
  // end
  Counter['length'] extends End ?
    Acc
  : // between start and end
    RecursiveCounter<
      Start,
      End,
      [...Counter, Counter['length']],
      Acc | Counter['length'],
      Started
    >
: // before start
  RecursiveCounter<Start, End, [...Counter, never], Acc, false>

type DayCounter<Start extends number, End extends number> =
  | Start
  | RecursiveCounter<Start, End>
  | End
