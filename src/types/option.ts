import { Applicative } from './applicative';
import { Functor } from './functor';

export type Option<A> = { tag: 'None' } | { tag: 'Some'; a: A };
export const None = (): Option<never> => ({ tag: 'None' });
export const Some = <A>(a: A): Option<A> => ({ tag: 'Some', a });

export const functor: Functor<'Option'> = {
  fmap: <A, B>(f: (_: A) => B, o: Option<A>): Option<B> => {
    return o.tag === 'None' ? None() : Some(f(o.a));
  },
};

export const applicative: Applicative<'Option'> = {
  ...functor,
  pure: Some,
  lifA2: function <A, B, C>(
    f: (a: A, b: B) => C,
    fa: Option<A>,
    fb: Option<B>
  ): Option<C> {
    return fa.tag === 'Some' && fb.tag === 'Some'
      ? Some(f(fa.a, fb.a))
      : None();
  },
  ap: function <A, B>(f: Option<(a: A) => B>, fa: Option<A>): Option<B> {
    return f.tag === 'Some' ? this.fmap(f.a, fa) : None();
  },
};
