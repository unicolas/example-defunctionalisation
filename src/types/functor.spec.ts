import { describe, expect, it } from '@jest/globals';
import { functor as arrayFunctor } from './array';
import { Left, Right, functor as eitherFunctor } from './either';
import { void_ } from './functor';
import { Id, functor as identityFunctor } from './identity';
import { None, Some, functor as optionFunctor } from './option';
import { functor as pairFunctor } from './pair';

describe('functor tests', () => {
  describe('fmap', () => {
    it('fmaps identity', () => {
      expect(identityFunctor.fmap((v) => v.toUpperCase(), Id('a'))).toEqual(
        Id('A')
      );
    });
    it('fmaps option', () => {
      expect(optionFunctor.fmap((v) => v + 1, Some(5))).toEqual(Some(6));
      expect(optionFunctor.fmap((v) => v + 1, None())).toEqual(None());
    });
    it('fmaps array', () => {
      expect(arrayFunctor.fmap((v) => v + 1, [1, 2, 3])).toEqual([2, 3, 4]);
    });
    it('fmaps pair', () => {
      expect(pairFunctor.fmap((v) => v + 1, [1, 2])).toEqual([1, 3]);
    });
    it('fmaps either', () => {
      expect(eitherFunctor.fmap((v) => v + 1, Left(1))).toEqual(Left(1));
      expect(eitherFunctor.fmap((v) => v + 1, Right(1))).toEqual(Right(2));
    });
  });
  describe('void', () => {
    it('voids identity', () => {
      expect(void_(identityFunctor)(Id('a'))).toEqual(Id([]));
    });
    it('voids option', () => {
      expect(void_(optionFunctor)(Some(5))).toEqual(Some([]));
      expect(void_(optionFunctor)(None())).toEqual(None());
    });
    it('voids array', () => {
      expect(void_(arrayFunctor)([1, 2, 3])).toEqual([[], [], []]);
    });
    it('voids pair', () => {
      expect(void_(pairFunctor)([1, 2])).toEqual([1, []]);
    });
    it('voids either', () => {
      expect(void_(eitherFunctor)(Left(1))).toEqual(Left(1));
      expect(void_(eitherFunctor)(Right(1))).toEqual(Right([]));
    });
  });
});
