import Board from "../src/Board";

test("should create a board", () => {
  const board = new Board("A");
  expect(board.name).toBe("A");
});

test("Should add the columns on board", () => {
  const board = new Board("A");
  board.addColumn("Todo", true);
  board.addColumn("Doing", true);
  board.addColumn("Done", false);
  expect(board.columns.length).toBe(3);
});

test("should add cards on columns of board", () => {
  const board = new Board("A");
  board.addColumn("Todo", true);
  board.addColumn("Doing", true);
  board.addColumn("Done", false);
  board.addCard("Todo", "Task 1", 4);
  board.addCard("Todo", "Task 2", 2);
  board.addCard("Todo", "Task 3", 1);
  expect(board.getColumn("Todo").getCards()).toHaveLength(3);
});

test("should calculate the estimate of a column", () => {
  const board = new Board("A");
  board.addColumn("Todo", true);
  board.addColumn("Doing", true);
  board.addColumn("Done", false);
  board.addCard("Todo", "Task 1", 4);
  board.addCard("Todo", "Task 2", 2);
  board.addCard("Todo", "Task 3", 1);
  expect(board.getColumn("Todo").getEstimative()).toBe(7);
});

test("should exchange a column card", () => {
  const board = new Board("A");
  board.addColumn("Todo", true);
  board.addColumn("Doing", true);
  board.addColumn("Done", false);
  board.addCard("Todo", "Task 1", 4);
  board.addCard("Todo", "Task 2", 2);
  board.addCard("Todo", "Task 3", 1);
  board.changeColumn("Task 1", "Todo", "Doing");
  expect(board.getColumn("Todo").getEstimative()).toBe(3);
  expect(board.getColumn("Doing").getEstimative()).toBe(4);
});

test("should store the time in each column", () => {
  const board = new Board("A");
  board.addColumn("Todo", true);
  board.addColumn("Doing", true);
  board.addColumn("Done", false);
  board.addCard("Todo", "Task 1", 4, new Date("2022-04-10T10:00:00"));
  board.changeColumn(
    "Task 1",
    "Todo",
    "Doing",
    new Date("2022-04-14T10:30:00")
  );
  const card = board.getColumn("Doing").getCard("Task 1");
  expect(card.transitions[0].date).toEqual(new Date("2022-04-10T10:00:00"));
  expect(card.transitions[1].date).toEqual(new Date("2022-04-14T10:30:00"));
});
