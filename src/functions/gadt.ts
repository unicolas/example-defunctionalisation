type Id<A, B> = ((a: A) => B) & ((b: B) => A);
const Refl =
  <A>(): Id<A, A> =>
  (a: A): A =>
    a;
type Arrow<A, B> =
  | { tag: 'Const'; A: Id<A, A>; B: Id<B, B>; b: B }
  | { tag: 'Next'; A: Id<A, number>; B: Id<B, number>; x: number }
  | { tag: 'Squared'; A: Id<A, number>; B: Id<B, number> };
const Const = <A, B>(b: B): Arrow<A, B> => ({
  tag: 'Const',
  A: Refl(),
  B: Refl(),
  b,
});
const Next = (x: number): Arrow<number, number> => ({
  tag: 'Next',
  A: Refl(),
  B: Refl(),
  x,
});
const Squared = (): Arrow<number, number> => ({
  tag: 'Squared',
  A: Refl(),
  B: Refl(),
});

const apply = <A, B>(arr: Arrow<A, B>, a: A): B => {
  switch (arr.tag) {
    case 'Const':
      return arr.b;
    case 'Next':
      return (arr.x = arr.x + 1), arr.B(arr.A(a) + arr.x);
    case 'Squared':
      return arr.B(arr.A(a) * arr.A(a));
  }
};
const map = <A, B>(f: Arrow<A, B>, a: A[]): B[] => {
  const [x, ...xs] = a;
  return x === undefined ? [] : [apply(f, x), ...map(f, xs)];
};
const replace = <A, B>(list: A[], b: B) => map(Const(b), list);
const main = <A>(list: A[]): number[] => {
  const numbers = replace(list, 0);
  let x = 0;
  const from1 = map(Next(x), numbers);
  const squared = map(Squared(), from1);
  return squared;
};
main([[], [], [], []]);

export {};
