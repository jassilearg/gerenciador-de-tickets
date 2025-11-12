import { calcularUrgencia } from '../src/services/slaService.js';
import fs from 'fs';

const casosDeTeste = JSON.parse(fs.readFileSync('../test_cases.json', 'utf-8'));

describe('Serviço de SLA - Casos oficiais do test_cases.json', () => {
  casosDeTeste.forEach(({ case_name, payload, expected_urgency }) => {
    test(case_name, () => {
      const urgenciaObtida = calcularUrgencia(payload.tipo_cliente, payload.descricao);
      expect(urgenciaObtida).toBe(expected_urgency);
    });
  });
});

afterAll(() => {
  console.log(`\nTotal de casos testados: ${casosDeTeste.length}`);
});
