/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Type aliases for the module. For interfaces, see ./interfaces.ts.
 */

import type { ComparisonResult } from './enums.ts';
import type { TComparer } from './interfaces.ts';

/**
 * Describes a function that compares two objects.
 *
 * @template T - The type of the objects to compare.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ComparisonResult } from './enums.ts';
 * import type { ComparerFn } from './type-aliases.ts';
 *
 * const comparer: ComparerFn<number> = (
 *   a: number,
 *   b: number,
 *   reverse = false,
 * ): ComparisonResult => {
 *    const [x, y] = reverse ? [b, a] : [a, b];
 *
 * return x < y
 *   ? ComparisonResult.Lesser
 *   : x > y
 *     ? ComparisonResult.Greater
 *     : ComparisonResult.Equal;
 * };
 *
 * const a = 1;
 * const b = 2;
 *
 * assertEquals(comparer(a, b, false), ComparisonResult.Lesser);
 * ```
 */
export type ComparerFn<T> = (a: T, b: T, reverse: boolean) => ComparisonResult;

/**
 * Describe a function or object that compares two objects.
 *
 * @template T - The type of the objects to compare.
 *
 * @see {@link TComparer}
 * @see {@link ComparerFn}
 */
export type Comparer<T> = TComparer<T> | ComparerFn<T>;
