/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the PropertyComparer class.
 */

import { ComparisonResult } from './types/enums.ts';
import { TComparer } from './types/interfaces.ts';

/**
 * A comparer that compares two objects by a property of type `T`.
 *
 * @template T The type of the objects to compare.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { PropertyComparer } from './property_comparer.ts';
 *
 * interface IPerson {
 *   name: string;
 *   age: number;
 * }
 *
 * const people: IPerson[] = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 20 },
 *   { name: 'David', age: 35 },
 *   { name: 'Eve', age: 40 },
 *   { name: 'Frank', age: 15 },
 * ];
 *
 * const comparer = PropertyComparer.for<IPerson>('age', true);
 *
 * // bind required for standard Array.prototype.sort
 * people.sort(comparer.compare.bind(comparer));
 *
 * assertEquals(people[0].name, 'Eve');
 * ```
 */
export class PropertyComparer<T> implements TComparer<T> {
  /**
   * Creates a new `PropertyComparer` instance.
   *
   * @param property The property to compare by.
   * @param reverse Whether to reverse the comparison.
   *
   * @returns A new `PropertyComparer` instance.
   */
  public static for<T>(
    property: keyof T,
    reverse = false,
  ): PropertyComparer<T> {
    return new PropertyComparer<T>(property, reverse);
  }

  /**
   * Creates a new `PropertyComparer` instance.
   *
   * @param property The property to compare by.
   * @param reverse Whether to reverse the comparison.
   */
  constructor(
    protected readonly property: keyof T,
    protected readonly reverse: boolean = false,
  ) {}

  /**
   * Compares two objects by the instance comparison property.
   *
   * @param a The first object to compare.
   * @param b The second object to compare.
   * @param reverse Whether to reverse the comparison.
   *
   * @returns The comparison result.
   */
  public compare(a: T, b: T, reverse = this.reverse): ComparisonResult {
    const { property } = this;
    const aValue = a[property];
    const bValue = b[property];

    const [aCompare, bCompare] = reverse ? [bValue, aValue] : [aValue, bValue];

    if (aCompare === bCompare) {
      return ComparisonResult.Equal;
    }

    return aCompare < bCompare
      ? ComparisonResult.Lesser
      : ComparisonResult.Greater;
  }
}
