// https://typehero.dev/challenge/query-string-parser
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  // 2
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  // 3
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  // 5
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  // 6
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  // 7
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  // 8
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  // 9
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  // 10
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

type test0 = ParseQueryString<"">;
type test1 = ParseQueryString<"k1">;
type test2 = ParseQueryString<"k1&k1">;
type test3 = ParseQueryString<"k1&k2">;
type test4 = ParseQueryString<"k1=v1">;
type test5 = ParseQueryString<"k1=v1&k1=v2">; //
type test6 = ParseQueryString<"k1=v1&k2=v2">;
type test7 = ParseQueryString<"k1=v1&k2=v2&k1=v2">;
type test8 = ParseQueryString<"k1=v1&k2">;
type test9 = ParseQueryString<"k1=v1&k1=v1">;
type test10 = ParseQueryString<"k1=v1&k1=v2&k1=v1">;
type test11 = ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">;
type test12 = ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">;
type test13 = ParseQueryString<"k1=v1&k1">;
type test14 = ParseQueryString<"k1&k1=v1">;

type Includes<Tuple, Item> = Tuple extends [infer First, ...infer Rest]
  ? First extends Item
    ? true
    : Includes<Rest, Item>
  : false;

// pretty merge
type PrettyMerge<
  A extends Record<string, unknown>,
  B extends Record<string, unknown>,
> = {
  [key in keyof A | keyof B]: key extends keyof B
    ? // key in both A and B
      key extends keyof A
      ? A[key] extends B[key]
        ? A[key]
        : // here value can be both tuple and non-tuple
          A[key] extends [...any]
          ? Includes<A[key], B[key]> extends true
            ? A[key]
            : [...A[key], B[key]]
          : [A[key], B[key]]
      : B[key]
    : key extends keyof A
      ? A[key]
      : never;
};

type testMerge = PrettyMerge<{ k1: "v1" }, { k2: "v2" }>;
type testMerge1 = PrettyMerge<{ k1: "v1" }, { k1: "v2" }>;

// want empty to be last case
type NotEmpty<S extends string> = S extends "" ? false : true;

type ParseQueryString<
  S extends string,
  Acc extends Record<string, unknown> = {},
> =
  // match K = V & -> recur
  S extends `${infer K}=${infer V}&${infer Rest}`
    ? ParseQueryString<Rest, PrettyMerge<Acc, Record<K, V>>>
    : // match K & -> recur
      S extends `${infer K}&${infer Rest}`
      ? ParseQueryString<Rest, PrettyMerge<Acc, Record<K, true>>>
      : // match K = V -> return
        S extends `${infer K}=${infer V}`
        ? PrettyMerge<Acc, Record<K, V>>
        : // match K -> return
          NotEmpty<S> extends true
          ? PrettyMerge<Acc, Record<S, true>>
          : Acc;
