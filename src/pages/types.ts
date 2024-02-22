export interface Config {
    collections: Collection[]
}

export interface Collection {
    items: ItemMap
    image: string
    caption: string
}

export interface Item {
    meta: Meta,
    image: string
    preview: string
}

export interface Meta {
    name: string
    author: string
    description: string
    published: string
    key: string
    price: number
    priority: number
    deactivated: number
}

export type ItemMap = {
    [key: string]: Item;
};