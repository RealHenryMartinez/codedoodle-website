export interface ICardLabelComponents {
    color: string,
    name: string
}

export interface ICardLabel {
    labels: ICardLabelComponents[],
}

export interface IDummy extends ICardLabel {
    title: string,
    description: string,
    image: string,
    _id?: string,
}

export interface ICard extends IDummy {
    createdAt: string;
    username: string;
    uid: string;
}