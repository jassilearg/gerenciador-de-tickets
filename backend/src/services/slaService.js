const IMPACT_KEYWORDS = {
    CRITICA: ['parado', 'offline', 'não funciona', 'nao funciona', 'down', 'fora do ar'],
    ALTA: ['erro', 'bug', 'lento', 'lentidão', 'lentidao', 'falha de acesso', 'falha'],
    MEDIA: ['dúvida', 'duvida', 'como fazer', 'ajuda', 'orientação', 'orientacao']
  };
  
  function normalizeText(text = '') {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  function highestImpactInDescription(descricao = '') {
    const norm = normalizeText(descricao);
    const impactOrder = ['CRITICA', 'ALTA', 'MEDIA'];
  
    for (const impact of impactOrder) {
      const keywords = IMPACT_KEYWORDS[impact];
      for (const kw of keywords) {
        if (norm.includes(kw)) return impact;
      }
    }
    return null;
  }
  
  export function calcularUrgencia(tipo_cliente, descricao) {
    const impact = highestImpactInDescription(descricao);
  
    switch (tipo_cliente) {
      case 'PREMIUM':
        if (impact === 'CRITICA') return 'CRITICA';
        if (impact === 'ALTA') return 'ALTA';
        return 'MEDIA';
      case 'BASICO':
        if (impact === 'CRITICA') return 'ALTA';
        if (impact === 'ALTA') return 'MEDIA';
        return 'BAIXA';
      case 'GRATUITO':
        if (impact === 'CRITICA') return 'MEDIA';
        return 'BAIXA';
      default:
        if (impact === 'CRITICA') return 'MEDIA';
        return 'BAIXA';
    }
  }
  
  export { normalizeText, highestImpactInDescription };
  