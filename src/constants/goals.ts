import type { GoalLevelKey } from '../types/goals'

// Sugestões quando a baseline é Nível 0
export const LEVEL_SUGGESTIONS_BASELINE_0: Record<GoalLevelKey, string> = {
  '2': 'Paciente apresentou excepcional progresso, comunicando-se verbalmente 15+ vezes por sessão.',
  '1': 'Paciente superou a meta alcançando 10-12 vezes de comunicação verbal por sessão.',
  '0': 'Paciente atingiu a meta de 8 vezes de comunicação verbal por sessão por 2 meses.',
  '-1': 'Paciente aumentou a frequência para 4-5 vezes de comunicação verbal por sessão.',
  '-2': 'Paciente não conseguiu iniciar os exercícios; frequência verbal permaneceu baixa.',
}

// Sugestões quando a baseline é Nível -1
export const LEVEL_SUGGESTIONS_BASELINE_MINUS_1: Record<GoalLevelKey, string> = {
  '2': 'Paciente alcançou resultado extraordinário, superando todas as expectativas iniciais e demonstrando evolução significativa.',
  '1': 'Paciente progrediu além do planejado, atingindo melhora considerável acima do ponto de partida.',
  '0': 'Paciente evoluiu conforme esperado para o contexto inicial, demonstrando progresso consistente.',
  '-1': 'Paciente está no ponto de partida, com desempenho baseline sem evolução significativa ainda.',
  '-2': 'Paciente apresentou retrocesso em relação à avaliação inicial, necessitando ajustes na intervenção.',
}

export const LEVEL_LABELS: Record<GoalLevelKey, string> = {
  '2': 'Meta alcançada acima do esperado',
  '1': 'Meta alcançada acima do esperado',
  '0': 'Meta alcançada exatamente como o esperado',
  '-1': 'Meta alcançada abaixo do esperado',
  '-2': 'Meta alcançada abaixo do esperado',
}

export const LEVEL_BADGES: Record<GoalLevelKey, string> = {
  '2': '2',
  '1': '1',
  '0': '0',
  '-1': '-1',
  '-2': '-2',
}

export const AI_SIMULATION_DELAY = 2000
export const HIGHLIGHT_DURATION = 10000
