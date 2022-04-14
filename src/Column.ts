import Card from "./Card";

export default class Column {
  cards: Card[] = [];

  constructor(readonly name: string, readonly hasEstimative: boolean) {
    this.cards = [];
  }

  addCard(card: Card, date: Date) {
    card.addTransition(this.name, date);
    this.cards.push(card);
  }

  getCards() {
    return this.cards;
  }

  getCard(title: string) {
    const card = this.cards.find((c) => c.title === title);
    if (!card) throw new Error("Card not found");
    return card;
  }

  getEstimative() {
    return this.cards.reduce((acc, card) => acc + card.estimative, 0);
  }

  removeCard(card: Card) {
    const index = this.cards.indexOf(card);
    if (index === -1) throw new Error("Card not found");
    this.cards.splice(index, 1);
  }
}
