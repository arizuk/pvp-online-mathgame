const pages = ['home', 'playerEdit', 'gameResult', 'gameWindow'] as const

export type Page = typeof pages[number]
