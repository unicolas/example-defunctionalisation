import { Functor2 } from "./functor";

export const functor: Functor2<'Pair'> = {
  fmap: function <A, B, C>(f: (_: A) => B, p: [C, A]): [C, B] {
    const [fst, snd] = p;
    return [fst, f(snd)];
  }
};
