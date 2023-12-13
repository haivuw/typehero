// https://typehero.dev/challenge/vue-basic-props

import type { Debug, Equal, Expect, IsAny } from '@type-challenges/utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom().toString())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})

type GetType<T> =
  T extends (...args: any[]) => infer Return ? Return
  : T extends { prototype: infer Prototype } ? Prototype
  : T extends (infer U)[] ? GetType<U>
  : never

type ParseProps<Props> = {
  [K in keyof Props]: keyof Props[K] extends never ? any
  : Props[K] extends { type: infer T } ? GetType<T>
  : GetType<Props[K]>
}

declare function VueBasicProps<
  Props extends Record<string, unknown>,
  Data extends Record<string, unknown>,
  Computed extends Record<string, (this: Data & ThisProps) => any>,
  Methods extends Record<string, Function>,
  ThisProps = ParseProps<Props>,
>(options: {
  props: Props
  data: (this: ThisProps) => Data
  computed: Computed
  methods: Methods &
    ThisType<
      Methods &
        ThisProps &
        Data & {
          [K in keyof Computed]: ReturnType<Computed[K]>
        }
    >
}): any
