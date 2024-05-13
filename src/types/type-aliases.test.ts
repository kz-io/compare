/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests type alias examples.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import { ComparerFn, ComparisonResult } from '../../mod.ts';

describe('type aliases', () => {
  describe('ComparerFn', () => {
    describe('examples', () => {
      it('should pass', () => {
        const comparer: ComparerFn<number> = (
          a: number,
          b: number,
          reverse = false,
        ): ComparisonResult => {
          const [x, y] = reverse ? [b, a] : [a, b];

          return x < y
            ? ComparisonResult.Lesser
            : x > y
            ? ComparisonResult.Greater
            : ComparisonResult.Equal;
        };

        const a = 1;
        const b = 2;

        assertEquals(comparer(a, b, false), ComparisonResult.Lesser);
      });
    });
  });
});
