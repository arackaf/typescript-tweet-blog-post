type Expect<T extends true> = T;
type False<T extends false> = true;
type ExpectNever<T extends never> = T;

type Examine<T, U> = T extends U
  ? U extends T
    ? [T, U]
    : [T, U]
  : [T, U];
type X = Examine<string | number, string | number>;

/*
Pass 1. T is string. U becomes string. Easy
Pass 2. T is still string. U starts as string | number, as it did in pass 1

T extends U === string extends string | number 

TRUE

T is now treated as string & (string | number). So string. No change. Nexy ->

U extends T. Continue distributing U. U was string in pass 1, so U is now number, which means T is NOW narrowed to string & number (so never)

Never does NOT extend number, so the B branch hits, and returns [never, number, 'b'] for the second entry
*/

type Square = {
  length: number;
};
type Circle = {
  radius: number;
};

type Description<T> = T extends Square
  ? "4 Sides"
  : T extends Circle
  ? "Round"
  : never;

function getDescription<T>(obj: T): Description<T> {
  return null as any;
}
const s: Square = {} as any;
const c: Circle = {} as any;

const sDescription = getDescription(s);
const cDescription = getDescription(c);

const either: Circle | Square = {} as any;
const eitherDescription = getDescription(either);

// type TypesMatch<T, U> = T extends U
//   ? U extends T
//     ? true
//     : false
//   : false;

type QQ = keyof 12;

type Examine2<T, U> = T extends U ? [T, U, "a"] : [T, U, "b"];

type X2 = Examine2<string | number, string | number>;

type ShapesMatch<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type TypesMatch<T, U> = ShapesMatch<T, U> extends true
  ? ShapesMatch<keyof T, keyof U>
  : false;

type ATests = [
  Expect<TypesMatch<string, string>>,
  Expect<False<TypesMatch<string, "foo">>>,
  Expect<False<TypesMatch<"foo", string>>>,
  Expect<False<TypesMatch<"foo", "bar">>>,
  Expect<TypesMatch<{}, {}>>,
  Expect<
    TypesMatch<{ a: number; b: string }, { a: number; b: string }>
  >,
  Expect<
    False<
      TypesMatch<{ a: number; b: string }, { a: number; b?: string }>
    >
  >,
  Expect<
    False<
      TypesMatch<{ a: number; b?: string }, { a: number; b: string }>
    >
  >
];

//type Examine<T, U> = T extends U ? (U extends T ? T : never) : never;

//type XXX = Examine<string | number, string | number>;

type Foo = "foo" | "bar";

type Tests = [Expect<TypesMatch<string | number, string | number>>];

// type TypesMatch<T, U> = T extends U ? true : false;
// type TypesMatch<T, U> = [T] extends [U]
//   ? [U] extends [T]
//     ? true
//     : false
//   : false;

// type TypesMatch2<T, U> = T extends U ? (U extends T ? T : never) : never;

// type Examine<T, U> = T extends U ? T : never;

// type XXX = TypesMatch2<string | number | object, string | number>;

// type S = Examine<string | number | (() => void), number | boolean>;

// type TypesMatch2<T, U> = T extends U
//   ? U extends T
//     ? true
//     : false
//   : false;

// type IsString<T extends string> = true;

//type Tests = [Expect<TypesMatch<string | number, string | number>>, Expect<IsString<"">>];

// type Cat = { kind: "cat" };
// type Dog = { kind: "dog" };
// type MustBeCat<T extends Cat> = T;

// type NotAConstraintViolation<T> = T extends Cat
//   ? [T, "is a cat"]
//   : [T, "not is cat"];

// type S = NotAConstraintViolation<{ kind: "cat"; x: boolean }>;

type TRUE = ["foo"] extends [string] ? true : false;

type FALSE = [string] extends ["foo"] ? true : false;
