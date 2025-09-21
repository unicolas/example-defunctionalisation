import { Functor } from "./functor";

export type Option<A> = { tag: 'None' } | { tag: 'Some'; a: A };
export const None = (): Option<never> => ({ tag: 'None' });
export const Some = <A>(a: A): Option<A> => ({ tag: 'Some', a });

export const functor: Functor<'Option'> = {
  fmap: <A, B>(f: (_: A) => B, o: Option<A>): Option<B> => {
    return o.tag === 'None' ? None() : Some(f(o.a));
  },
};
