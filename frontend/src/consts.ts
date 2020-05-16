const pages = ['home', 'playerEdit'] as const

export type Page = typeof pages[number]
