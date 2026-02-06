/**
 * CSIR EOI 8119/06/01/2026 - Utility Tests
 * Unit tests for utility functions
 */

import {
  formatNumber,
  formatInMillions,
  calculatePercentageChange,
  truncateText,
  isEmpty,
} from '@/utils';

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    it('should format numbers with thousands separator', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(333287557)).toBe('333,287,557');
    });

    it('should handle small numbers', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(100)).toBe('100');
    });
  });

  describe('formatInMillions', () => {
    it('should convert to millions with default decimals', () => {
      expect(formatInMillions(1000000)).toBe('1.00M');
      expect(formatInMillions(333287557)).toBe('333.29M');
    });

    it('should respect decimal parameter', () => {
      expect(formatInMillions(333287557, 1)).toBe('333.3M');
      expect(formatInMillions(333287557, 0)).toBe('333M');
    });
  });

  describe('calculatePercentageChange', () => {
    it('should calculate positive change', () => {
      const change = calculatePercentageChange(110, 100);
      expect(change).toBe(10);
    });

    it('should calculate negative change', () => {
      const change = calculatePercentageChange(90, 100);
      expect(change).toBe(-10);
    });

    it('should handle zero previous value', () => {
      const change = calculatePercentageChange(100, 0);
      expect(change).toBe(0);
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that should be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long ...');
    });

    it('should not truncate short text', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });
  });

  describe('isEmpty', () => {
    it('should detect empty values', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });

    it('should detect non-empty values', () => {
      expect(isEmpty('text')).toBe(false);
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });
});
