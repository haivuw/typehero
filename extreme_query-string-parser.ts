import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  // 3
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  // 6
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"] }>>,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">,
      { k1: ["v1", "v2"]; k2: "v1" }
    >
  >,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">,
      { k1: ["v1", "v2", "v3"]; k2: "v2" }
    >
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true] }>>,
  Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"] }>>,
];

// pretty merge
type Merge<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
> = {
  [key in keyof A | keyof B]: key extends keyof A
    ? A[key]
    : key extends keyof B
      ? B[key]
      : never;
};

type testMerge = Merge<{ k1: "v1" }, { k2: "v2" }>;

// CASES:

// match K = V & -> recur
// match K & -> recur
// match K = V -> return
// match K -> return
// empty string -> return

type NotEmpty<S extends string> = S extends "" ? false : true;

type ParseQueryString<
  S extends string,
  Acc extends Record<string, unknown> = {},
> =
  // match K = V & -> recur
  S extends `${infer K}=${infer V}&${infer Rest}`
    ? ParseQueryString<Rest, Merge<Acc, Record<K, V>>>
    : // match K & -> recur
      S extends `${infer K}&${infer Rest}`
      ? ParseQueryString<Rest, Merge<Acc, Record<K, true>>>
      : // match K = V -> return
        S extends `${infer K}=${infer V}`
        ? Merge<Acc, Record<K, V>>
        : // match K -> return
          NotEmpty<S> extends true
          ? Merge<Acc, Record<S, true>>
          : Acc;

type test0 = ParseQueryString<"">;
type test1 = ParseQueryString<"k1">;
type test2 = ParseQueryString<"k1&k1">;
type test3 = ParseQueryString<"k1&k2">;
type test4 = ParseQueryString<"k1=v1">;
type test5 = ParseQueryString<"k1=v1&k1=v2">; //
type test6 = ParseQueryString<"k1=v1&k2=v2">;
type x = Equal<test6, { k1: "v1" } & { k2: "v2" }>;
type test7 = ParseQueryString<"k1=v1&k2=v2&k1=v2">;
type test8 = ParseQueryString<"k1=v1&k2">;
type test9 = ParseQueryString<"k1=v1&k1=v1">;
type test10 = ParseQueryString<"k1=v1&k1=v2&k1=v1">;
type test11 = ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">;
type test12 = ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">;
type test13 = ParseQueryString<"k1=v1&k1">;
type test14 = ParseQueryString<"k1&k1=v1">;
