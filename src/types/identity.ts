import { Functor } from "./functor";

export type Identity<A> = { tag: 'Id'; a: A };
export const Id = <A>(a: A): Identity<A> => ({ tag: 'Id', a });

export const functor: Functor<'Identity'> = {
  fmap: function <A, B>(f: (_: A) => B, i: Identity<A>): Identity<B> {
    return Id(f(i.a))
  }
};
