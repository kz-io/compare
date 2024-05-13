/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests enum examples.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import { ComparisonResult } from '../../mod.ts';

describe('enums', () => {
  describe('ComparisonResult', () => {
    describe('examples', () => {
      it('should pass', () => {
        const a = 1;
        const b = 2;
        const result = a < b
          ? ComparisonResult.Lesser
          : a > b
          ? ComparisonResult.Greater
          : ComparisonResult.Equal;

        assertEquals(result, ComparisonResult.Lesser);
      });
    });
  });
});
