// https://typehero.dev/challenge/capitalize-words
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<
    Equal<
      CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>,
      'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'
    >
  >,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]

type isLetter<S extends string> =
  Uppercase<S> extends Lowercase<S> ? false : true

type RecurCapitalizeWords<S extends string> =
  S extends `${infer First}${infer Sec}${infer Rest}` ?
    isLetter<Sec> extends true ?
      isLetter<First> extends true ?
        `${First}${Sec}${RecurCapitalizeWords<Rest>}`
      : `${First}${Uppercase<Sec>}${RecurCapitalizeWords<Rest>}`
    : `${First}${RecurCapitalizeWords<`${Sec}${Rest}`>}`
  : S

type CapitalizeWords<S extends string> = Capitalize<RecurCapitalizeWords<S>>
