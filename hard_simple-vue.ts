// https://typehero.dev/challenge/simple-vue

import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
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
      alert(this.amount.toString())
      alert(this.fullname.toLowerCase())
      alert(this.getRandom().toString())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})

declare function SimpleVue<
  Data extends Record<string, unknown>,
  Computed extends Record<string, (this: Data) => any>,
  Methods extends Record<string, Function>,
>(options: {
  data: (this: never) => Data
  computed: Computed
  methods: Methods &
    ThisType<
      Methods &
        Data & {
          [K in keyof Computed]: ReturnType<Computed[K]>
        }
    >
}): any
