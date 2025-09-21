import { Apply, Apply2, Brand, Brand2 } from './apply';
import { Functor, Functor2, Functor_ } from './functor';

export interface Applicative<F extends Brand> extends Functor<F> {
  pure: <A>(a: A) => Apply<F, A>;
  lifA2: <A, B, C>(
    f: (a: A, b: B) => C,
    fa: Apply<F, A>,
    fb: Apply<F, B>
  ) => Apply<F, C>;
  ap: <A, B>(f: Apply<F, (a: A) => B>, fa: Apply<F, A>) => Apply<F, B>;
}
export interface Applicative2<F extends Brand2> extends Functor2<F> {
  pure: <A, B>(a: A) => Apply2<F, B, A>;
  lifA2: <A, B, C, D>(
    f: (a: A, b: B) => C,
    fa: Apply2<F, D, A>,
    fb: Apply2<F, D, B>
  ) => Apply2<F, D, C>;
  ap: <A, B, C>(
    f: Apply2<F, C, (a: A) => B>,
    fa: Apply2<F, C, A>
  ) => Apply2<F, C, B>;
}
interface Applicative_ extends Functor_ {
  pure: <A>(a: A) => unknown;
  lifA2: <A, B, C>(f: (a: A, b: B) => C, fa: unknown, fb: unknown) => unknown;
  ap: (f: unknown, fa: unknown) => unknown;
}

export function liftA<F extends Brand>(
  a: Applicative<F>
): <A, B>(f: (a: A) => B, fa: Apply<F, A>) => Apply<F, B>;
export function liftA<F extends Brand2>(
  a: Applicative2<F>
): <A, B, C>(f: (a: A) => B, fa: Apply2<F, C, A>) => Apply2<F, C, B>;
export function liftA(
  a: Applicative_
): <A, B>(f: (a: A) => B, fa: unknown) => unknown {
  return (f, fa) => a.ap(a.pure(f), fa);
}
