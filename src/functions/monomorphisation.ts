type ArrowUnitNum = { tag: 'Const'; b: number };
const Const = (b: number): ArrowUnitNum => ({ tag: 'Const', b });

type ArrowNumNum = { tag: 'Next'; x: number } | { tag: 'Squared' };
const Next = (x: number): ArrowNumNum => ({ tag: 'Next', x });
const Squared = (): ArrowNumNum => ({ tag: 'Squared' });

const applyUnitNum = (arr: ArrowUnitNum, _: []): number => arr.b;

const applyNumNum = (arr: ArrowNumNum, n: number): number => {
  switch (arr.tag) {
    case 'Next':
      return (arr.x = arr.x + 1), n + arr.x;
    case 'Squared':
      return n * n;
  }
};
const mapUnitNum = (arr: ArrowUnitNum, a: [][]): number[] => {
  const [x, ...xs] = a;
  return x === undefined ? [] : [applyUnitNum(arr, x), ...mapUnitNum(arr, xs)];
};
const mapNumNum = (arr: ArrowNumNum, a: number[]): number[] => {
  const [x, ...xs] = a;
  return x === undefined ? [] : [applyNumNum(arr, x), ...mapNumNum(arr, xs)];
};
const replace = (list: [][], b: number) => mapUnitNum(Const(b), list);
const fn = (list: [][]): number[] => {
  const numbers = replace(list, 0);
  let x = 0;
  const from1 = mapNumNum(Next(x), numbers);
  const squared = mapNumNum(Squared(), from1);
  return squared;
};
fn([[], [], [], []]);

export {};
