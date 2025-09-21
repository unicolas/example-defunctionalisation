import { Apply, Apply2, Brand, Brand2 } from "./apply";

export interface Functor<F extends Brand> {
  fmap: <A, B>(f: (_: A) => B, a: Apply<F, A>) => Apply<F, B>;
}
export interface Functor2<F extends Brand2> {
  fmap: <A, B, C>(f: (_: A) => B, a: Apply2<F, C, A>) => Apply2<F, C, B>;
}

interface Functor_ {
  fmap: <A, B>(f: (_: A) => B, a: unknown) => unknown;
}

export function void_<F extends Brand>(
  f: Functor<F>
): <A>(fa: Apply<F, A>) => Apply<F, []>;
export function void_<F extends Brand2>(
  f: Functor2<F>
): <A, B>(fa: Apply2<F, A, B>) => Apply2<F, A, []>;
export function void_(f: Functor_): (fa: unknown) => unknown {
  return (fa) => f.fmap(() => [], fa);
}
