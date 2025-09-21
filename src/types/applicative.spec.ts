import { describe, expect, it } from '@jest/globals';
import { liftA } from './applicative';
import * as option from './option';

describe('applicative tests', () => {
  describe('pure', () => {
    it('option', () => {
      expect(option.applicative.pure(1)).toEqual(option.Some(1));
    });
  });
  describe('liftA2', () => {
    it('option', () => {
      expect(
        option.applicative.lifA2(
          (a, b) => a + b,
          option.Some(1),
          option.Some(2)
        )
      ).toEqual(option.Some(3));
      expect(
        option.applicative.lifA2((a, b) => a + b, option.None(), option.Some(2))
      ).toEqual(option.None());
      expect(
        option.applicative.lifA2((a, b) => a + b, option.Some(1), option.None())
      ).toEqual(option.None());
    });
  });
  describe('ap', () => {
    it('option', () => {
      expect(
        option.applicative.ap(
          option.Some((a: number) => a + 1),
          option.Some(2)
        )
      ).toEqual(option.Some(3));
      expect(
        option.applicative.ap(
          option.Some((a: number) => a + 1),
          option.None()
        )
      ).toEqual(option.None());
      expect(option.applicative.ap(option.None(), option.Some(2))).toEqual(
        option.None()
      );
    });
  });
  describe('liftA', () => {
    it('option', () => {
      expect(liftA(option.applicative)((a) => a + 1, option.Some(2))).toEqual(
        option.Some(3)
      );
      expect(liftA(option.applicative)((a) => a + 1, option.None())).toEqual(
        option.None()
      );
    });
  });
});
