export type GoalLevelKey = '-2' | '-1' | '0' | '1' | '2'

export type Goal = {
  id: string
  name: string
  baseline: '0' | '-1'
  levels: Record<GoalLevelKey, string>
}



