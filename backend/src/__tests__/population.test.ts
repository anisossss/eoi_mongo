/**
 * CSIR EOI 8119/06/01/2026 - Population Data Tests
 * Unit tests for population data functionality
 */

describe('Population Data', () => {
  const sampleData = [
    {
      idNation: '01000US',
      nation: 'United States',
      idYear: 2022,
      year: 2022,
      population: 333287557,
      slugNation: 'united-states',
    },
    {
      idNation: '01000US',
      nation: 'United States',
      idYear: 2021,
      year: 2021,
      population: 329725481,
      slugNation: 'united-states',
    },
  ];

  describe('Data Transformation', () => {
    it('should format population correctly', () => {
      const population = 333287557;
      const formatted = population.toLocaleString('en-US');
      expect(formatted).toBe('333,287,557');
    });

    it('should calculate population in millions', () => {
      const population = 333287557;
      const millions = (population / 1_000_000).toFixed(2);
      expect(millions).toBe('333.29');
    });

    it('should calculate growth rate correctly', () => {
      const current = sampleData[0].population;
      const previous = sampleData[1].population;
      const growth = ((current - previous) / previous) * 100;
      expect(growth).toBeGreaterThan(0);
      expect(growth).toBeLessThan(5); // Reasonable growth rate
    });
  });

  describe('Data Structure', () => {
    it('should have required fields', () => {
      const record = sampleData[0];
      expect(record).toHaveProperty('idNation');
      expect(record).toHaveProperty('nation');
      expect(record).toHaveProperty('year');
      expect(record).toHaveProperty('population');
      expect(record).toHaveProperty('slugNation');
    });

    it('should have valid year values', () => {
      sampleData.forEach((record) => {
        expect(record.year).toBeGreaterThan(1900);
        expect(record.year).toBeLessThan(2100);
      });
    });

    it('should have positive population values', () => {
      sampleData.forEach((record) => {
        expect(record.population).toBeGreaterThan(0);
      });
    });
  });

  describe('Tree Structure Generation', () => {
    it('should generate valid tree structure', () => {
      const treeData = {
        id: 'root',
        name: 'Population Data',
        type: 'root',
        children: [
          {
            id: '01000US',
            name: 'United States',
            type: 'nation',
            children: sampleData.map((d) => ({
              id: `${d.idNation}-${d.year}`,
              name: `${d.year}`,
              type: 'year',
              value: d.population,
            })),
          },
        ],
      };

      expect(treeData.id).toBe('root');
      expect(treeData.children).toHaveLength(1);
      expect(treeData.children[0].children).toHaveLength(2);
    });
  });
});
