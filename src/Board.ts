import Card from "./Card";
import Column from "./Column";

export default class Board {
  columns: Column[];

  constructor(readonly name: string) {
    this.columns = [];
  }

  addColumn(name: string, hasEstimative: boolean) {
    this.columns.push(new Column(name, hasEstimative));
  }

  getColumn(name: string) {
    const column = this.columns.find((c) => c.name === name);
    if (!column) throw new Error("Column does not exist");
    return column;
  }

  addCard(
    columnName: string,
    name: string,
    estimative: number,
    date: Date = new Date()
  ) {
    const column = this.getColumn(columnName);
    column.addCard(new Card(name, estimative), date);
  }

  changeColumn(
    cardTitle: string,
    from: string,
    to: string,
    date: Date = new Date()
  ) {
    const card = this.getColumn(from).getCard(cardTitle);
    this.getColumn(to).addCard(card, date);
    this.getColumn(from).removeCard(card);
  }
} 
