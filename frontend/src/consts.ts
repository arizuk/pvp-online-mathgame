const pages = ['home', 'playerEdit', 'gameResult'] as const

export type Page = typeof pages[number]
