import { Functor2 } from "./functor";

export type Either<A, B> = { tag: 'Left'; a: A } | { tag: 'Right'; b: B };
export const Left = <A>(a: A): Either<A, never> => ({ tag: 'Left', a });
export const Right = <B>(b: B): Either<never, B> => ({ tag: 'Right', b });

export const functor: Functor2<'Either'> = {
  fmap: <A, B, C>(f: (_: A) => B, e: Either<C, A>): Either<C, B> => {
    return e.tag === 'Left' ? Left(e.a) : Right(f(e.b));
  },
};
