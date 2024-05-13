/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Interfaces for the module. For type aliases, see ./type-aliases.ts.
 */

import type { ComparisonResult } from './enums.ts';
import type { Comparer } from './type-aliases.ts';

/**
 * Describes an object that can be compared to another object.
 *
 * @template T - The type of the object to compare.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ComparisonResult } from './enums.ts';
 * import type { TComparable } from './interfaces.ts';
 *
 * class ComparableNumber implements TComparable<ComparableNumber> {
 *   constructor(public readonly value: number) {}
 *
 *   compare(other: ComparableNumber, reverse = false): ComparisonResult {
 *     const [a, b] = reverse
 *       ? [other.value, this.value]
 *       : [this.value, other.value];
 *
 *     return a < b
 *       ? ComparisonResult.Lesser
 *       : a > b
 *       ? ComparisonResult.Greater
 *       : ComparisonResult.Equal;
 *   }
 * }
 *
 * const a = new ComparableNumber(1);
 * const b = new ComparableNumber(2);
 *
 * assertEquals(a.compare(b), ComparisonResult.Lesser);
 * ```
 */
export interface TComparable<T> {
  /**
   * Compares this object to another object.
   *
   * @param other - The object to compare to.
   * @param reverse - Whether to reverse the comparison.
   *
   * @returns The comparison result.
   */
  compare(other: T, reverse: boolean): ComparisonResult;
}

/**
 * Describes an object that can compare two objects.
 *
 * @template T - The type of the objects to compare.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ComparisonResult } from './enums.ts';
 * import type { TComparer } from './interfaces.ts';
 *
 * const comparer: TComparer<number> = {
 *   compare(a, b, reverse): ComparisonResult {
 *     const [x, y] = reverse ? [b, a] : [a, b];
 *     return x < y
 *       ? ComparisonResult.Lesser
 *       : x > y
 *       ? ComparisonResult.Greater
 *       : ComparisonResult.Equal;
 *   },
 * };
 *
 * const a = 1;
 * const b = 2;
 *
 * assertEquals(comparer.compare(a, b, false), ComparisonResult.Lesser);
 * ```
 */
export interface TComparer<T> {
  /**
   * Compares two objects.
   *
   * @param a The first object to compare.
   * @param b The second object to compare.
   * @param reverse Whether to reverse the comparison.
   */
  compare(a: T, b: T, reverse: boolean): ComparisonResult;
}

/**
 * Describes an object that can be sorted.
 *
 * @template T - The interal type of the object to sort.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ComparisonResult } from './enums.ts';
 * import type { TSortable } from './interfaces.ts';
 * import type { Comparer } from './type-aliases.ts';
 *
 * class SortableArray<T> implements TSortable<T> {
 *   constructor(public readonly array: T[]) {}
 *
 *   sort(comparer: Comparer<T>, reverse = false): void {
 *     this.array.sort((a, b) => {
 *       return (typeof comparer === 'function')
 *         ? comparer(a, b, reverse)
 *         : comparer.compare(a, b, reverse);
 *     });
 *   }
 *
 *   [Symbol.iterator](): Iterator<T> {
 *     return this.array[Symbol.iterator]();
 *   }
 * }
 *
 * const array = new SortableArray([3, 2, 1]);
 *
 * const comparer: Comparer<number> = {
 *   compare(a: number, b: number, reverse = false): ComparisonResult {
 *     const [x, y] = reverse ? [b, a] : [a, b];
 *
 *     return x < y
 *       ? ComparisonResult.Lesser
 *       : x > y
 *       ? ComparisonResult.Greater
 *       : ComparisonResult.Equal;
 *   },
 * };
 * array.sort(comparer);
 *
 * assertEquals([...array], [1, 2, 3]);
 *
 * array.sort(comparer, true);
 *
 * assertEquals([...array], [3, 2, 1]);
 * ```
 */
export interface TSortable<T> extends Iterable<T> {
  /**
   * Sorts the object.
   *
   * @param comparer - The comparer to use.
   * @param reverse - Whether to reverse the sort.
   */
  sort(comparer: Comparer<T>, reverse: boolean): void;
}
