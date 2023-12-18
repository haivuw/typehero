// https://typehero.dev/challenge/deeppick
import type { Equal, Expect } from '@type-challenges/utils'
import { Prettify } from './utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >,
]

type DeepPick<
  T,
  Key extends string,
  U = Key extends any ? DeepPickOnePath<T, Key> : never,
> = [Key] extends [''] ? unknown : UnionToIntersection<U>

type DeepPickOnePath<T, K extends string> = K extends '' ? {}
: {
    [key in K as Head<K>]: Tail<K> extends never ? T[key & keyof T]
    : DeepPickOnePath<T[Head<key> & keyof T], Tail<K>>
  }

type UnionToIntersection<U> =
  (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void ?
    I
  : never

type Head<S> =
  S extends `${infer Head}.${string}` ? Head
  : S extends '' ? never
  : S

type Tail<S> = S extends `${string}.${infer Tail}` ? Tail : never
