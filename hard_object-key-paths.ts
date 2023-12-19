// https://typehero.dev/challenge/object-key-paths
import type { Equal, Expect, ExpectExtends } from '@type-challenges/utils'
import { Prettify } from './utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number
        person: { name: string; age: number }
      }>,
      'refCount' | 'person' | 'person.name' | 'person.age'
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>
  >,
  Expect<
    Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>
  >,
  Expect<
    Equal<
      ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>,
      false
    >
  >,
]

type ObjectKeyPaths<
  T,
  Acc = '',
  Paths = T extends unknown[] ? JoinArrayPath<Acc>
  : T extends Record<string, unknown> ? JoinObjectPath<Acc, keyof T>
  : Acc,
> = T extends unknown[] ? Paths | ObjectKeyPaths<T[number], Paths>
: T extends Record<string, unknown> ?
  | Paths
  | {
      [K in keyof T]: ObjectKeyPaths<T[K], JoinObjectPath<Acc, K>>
    }[keyof T]
: Acc

type JoinObjectPath<A, B> = A extends '' ? B : `${A & string}.${B & string}`
type JoinArrayPath<P> = `${P & string}${
  | `.${number}`
  | `${'' | '.'}[${number}]`}`

type test = Prettify<ObjectKeyPaths<typeof ref>>
