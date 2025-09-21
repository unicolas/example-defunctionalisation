import { describe, expect, it } from '@jest/globals';
import * as array from './array';
import * as either from './either';
import { void_ } from './functor';
import * as identity from './identity';
import * as option from './option';
import * as pair from './pair';

describe('functor tests', () => {
  describe('fmap', () => {
    it('fmaps identity', () => {
      expect(
        identity.functor.fmap((v) => v.toUpperCase(), identity.Id('a'))
      ).toEqual(identity.Id('A'));
    });
    it('fmaps option', () => {
      expect(option.functor.fmap((v) => v + 1, option.Some(5))).toEqual(
        option.Some(6)
      );
      expect(option.functor.fmap((v) => v + 1, option.None())).toEqual(
        option.None()
      );
    });
    it('fmaps array', () => {
      expect(array.functor.fmap((v) => v + 1, [1, 2, 3])).toEqual([2, 3, 4]);
    });
    it('fmaps pair', () => {
      expect(pair.functor.fmap((v) => v + 1, [1, 2])).toEqual([1, 3]);
    });
    it('fmaps either', () => {
      expect(either.functor.fmap((v) => v + 1, either.Left(1))).toEqual(
        either.Left(1)
      );
      expect(either.functor.fmap((v) => v + 1, either.Right(1))).toEqual(
        either.Right(2)
      );
    });
  });
  describe('void', () => {
    it('voids identity', () => {
      expect(void_(identity.functor)(identity.Id('a'))).toEqual(
        identity.Id([])
      );
    });
    it('voids option', () => {
      expect(void_(option.functor)(option.Some(5))).toEqual(option.Some([]));
      expect(void_(option.functor)(option.None())).toEqual(option.None());
    });
    it('voids array', () => {
      expect(void_(array.functor)([1, 2, 3])).toEqual([[], [], []]);
    });
    it('voids pair', () => {
      expect(void_(pair.functor)([1, 2])).toEqual([1, []]);
    });
    it('voids either', () => {
      expect(void_(either.functor)(either.Left(1))).toEqual(either.Left(1));
      expect(void_(either.functor)(either.Right(1))).toEqual(either.Right([]));
    });
  });
});
