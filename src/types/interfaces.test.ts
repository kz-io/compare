/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests interface examples.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import {
  Comparer,
  ComparisonResult,
  type TComparable,
  type TComparer,
  TSortable,
} from '../../mod.ts';

describe('interfaces', () => {
  describe('TComparable', () => {
    describe('examples', () => {
      it('should pass', () => {
        class ComparableNumber implements TComparable<ComparableNumber> {
          constructor(public readonly value: number) {}

          compare(other: ComparableNumber, reverse = false): ComparisonResult {
            const [a, b] = reverse
              ? [other.value, this.value]
              : [this.value, other.value];

            return a < b
              ? ComparisonResult.Lesser
              : a > b
              ? ComparisonResult.Greater
              : ComparisonResult.Equal;
          }
        }

        const a = new ComparableNumber(1);
        const b = new ComparableNumber(2);

        assertEquals(a.compare(b), ComparisonResult.Lesser);
      });
    });
  });
  describe('TComparer', () => {
    describe('examples', () => {
      it('should pass', () => {
        const comparer: TComparer<number> = {
          compare(a, b, reverse): ComparisonResult {
            const [x, y] = reverse ? [b, a] : [a, b];

            return x < y
              ? ComparisonResult.Lesser
              : x > y
              ? ComparisonResult.Greater
              : ComparisonResult.Equal;
          },
        };

        const a = 1;
        const b = 2;

        assertEquals(comparer.compare(a, b, false), ComparisonResult.Lesser);
      });
    });
  });
  describe('TSortable', () => {
    describe('examples', () => {
      it('should pass', () => {
        class SortableArray<T> implements TSortable<T> {
          constructor(public readonly array: T[]) {}

          sort(comparer: Comparer<T>, reverse = false): void {
            this.array.sort((a, b) => {
              return (typeof comparer === 'function')
                ? comparer(a, b, reverse)
                : comparer.compare(a, b, reverse);
            });
          }

          [Symbol.iterator](): Iterator<T> {
            return this.array[Symbol.iterator]();
          }
        }

        const array = new SortableArray([3, 2, 1]);

        const comparer: Comparer<number> = {
          compare(a: number, b: number, reverse = false): ComparisonResult {
            const [x, y] = reverse ? [b, a] : [a, b];

            return x < y
              ? ComparisonResult.Lesser
              : x > y
              ? ComparisonResult.Greater
              : ComparisonResult.Equal;
          },
        };
        array.sort(comparer);

        assertEquals([...array], [1, 2, 3]);

        array.sort(comparer, true);

        assertEquals([...array], [3, 2, 1]);
      });
    });
  });
});
