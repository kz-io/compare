/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Enums for the module.
 */

/**
 * Specifies the comparison result of two values.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ComparisonResult } from './enums.ts';
 *
 * const a = 1;
 * const b = 2;
 *
 * const result = a < b
 *   ? ComparisonResult.Lesser
 *   : a > b
 *   ? ComparisonResult.Greater
 *   : ComparisonResult.Equal;
 *
 * assertEquals(result, ComparisonResult.Lesser);
 * ```
 */
export enum ComparisonResult {
  /**
   * First value is less than the second value.
   */
  Lesser = -1,

  /**
   * Two values are equal.
   */
  Equal = 0,

  /**
   * First value is greater than the second value.
   */
  Greater = 1,
}
