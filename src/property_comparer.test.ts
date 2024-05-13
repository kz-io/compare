/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the PropertyComparer class.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import { ComparisonResult, PropertyComparer } from '../mod.ts';

describe('PropertyComparer', () => {
  it('should compare two objects', () => {
    const comparer = new PropertyComparer('value');

    const a = { value: 1 };
    const b = { value: 2 };

    assertEquals(comparer.compare(a, b, false), ComparisonResult.Lesser);
  });

  it('should compare two objects in reverse', () => {
    const comparer = new PropertyComparer('value');

    const a = { value: 1 };
    const b = { value: 2 };

    assertEquals(comparer.compare(a, b, true), ComparisonResult.Greater);
  });

  it('should return 0 when comparing two equal objects', () => {
    const comparer = PropertyComparer.for('value', true);

    const a = { value: 1 };
    const b = { value: 1 };

    assertEquals(comparer.compare(a, b), ComparisonResult.Equal);
  });

  describe('examples', () => {
    describe('class', () => {
      it('should pass', () => {
        interface IPerson {
          name: string;
          age: number;
        }

        const people: IPerson[] = [
          { name: 'Alice', age: 25 },
          { name: 'Bob', age: 30 },
          { name: 'Charlie', age: 20 },
          { name: 'David', age: 35 },
          { name: 'Eve', age: 40 },
          { name: 'Frank', age: 15 },
        ];

        const comparer = PropertyComparer.for<IPerson>('age', true);

        // bind required for standard Array.prototype.sort
        people.sort(comparer.compare.bind(comparer));

        assertEquals(people[0].name, 'Eve');
      });
    });
  });
});
