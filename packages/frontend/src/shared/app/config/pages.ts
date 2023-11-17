export const pages = ['hub', 'room', 'main'] as const

export type Page = (typeof pages)[number]
