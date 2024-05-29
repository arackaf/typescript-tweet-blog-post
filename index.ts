type Expect<T extends true> = T;
type Not<T extends false> = true;

type IsArray<T> = T extends Array<any> ? true : false;

type X = Expect<IsArray<number[]>>;

type Y = Expect<Not<IsArray<number>>>;

type ShapesMatch<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type TypesMatch<T, U> = ShapesMatch<T, U> extends true
  ? ShapesMatch<keyof T, keyof U> extends true
    ? true
    : false
  : false;

type Tests = [
  // prettier-ignore
  Expect<Not<TypesMatch<string, "foo">>>,
  Expect<TypesMatch<string | number, string | number>>,
  Expect<Not<TypesMatch<string | number, string | number | object>>>,
  Expect<Not<TypesMatch<{ a: number }, { a: number; b?: string }>>>,
  Expect<
    Not<
      TypesMatch<{ a: number; b?: number }, { a: number; b?: string }>
    >
  >
];
