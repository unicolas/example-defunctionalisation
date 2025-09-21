import { Either } from "./either";
import { Identity } from "./identity";
import { Option } from "./option";

export type Type<T> = {
  Identity: Identity<T>;
  Option: Option<T>;
  Array: Array<T>;
};
type Type2<T, U> = {
  Pair: [T, U];
  Either: Either<T, U>;
};
export type Brand = keyof Type<never>;
export type Brand2 = keyof Type2<never, never>;
export type Apply<B extends Brand, T> = Type<T>[B];
export type Apply2<B extends Brand2, T, U> = Type2<T, U>[B];
