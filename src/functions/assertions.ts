type Arrow<_, B> =
  | { tag: 'Const'; b: B }
  | { tag: 'Next'; x: number }
  | { tag: 'Squared' };
const Const = <A, B>(b: B): Arrow<A, B> => ({ tag: 'Const', b });
const Next = (x: number): Arrow<number, number> => ({ tag: 'Next', x });
const Squared = (): Arrow<number, number> => ({ tag: 'Squared' });

const apply = <A, B>(arr: Arrow<A, B>, n: A): B => {
  switch (arr.tag) {
    case 'Const':
      return arr.b;
    case 'Next':
      return (arr.x = arr.x + 1), ((n as number) + arr.x) as B;
    case 'Squared':
      return ((n as number) * (n as number)) as B;
  }
};

const map = <A, B>(f: Arrow<A, B>, a: A[]): B[] => {
  const [x, ...xs] = a;
  return x === undefined ? [] : [apply(f, x), ...map(f, xs)];
};
const replace = <A, B>(list: A[], b: B) => map(Const(b), list);
const fn = <A>(list: A[]): number[] => {
  const numbers = replace(list, 0);
  let x = 0;
  const from1 = map(Next(x), numbers);
  const squared = map(Squared(), from1);
  return squared;
};
fn([[], [], [], []]);

export {};
