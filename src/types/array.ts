import { Functor } from "./functor";

export const functor: Functor<'Array'> = {
  fmap: function <A, B>(f: (_: A) => B, a: A[]): B[] {
    return a.map(f);
  }
};
