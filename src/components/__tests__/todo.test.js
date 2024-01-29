import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Todo from "../todo";

afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  const todo = { id: 1, title: "wash the dishes", completed: false };
  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-1");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("wash the dishes");
  expect(todoElement).not.toContainHTML("<strike>");
});

test("should render completed todo", () => {
  const todo = { id: 2, title: "make dinner", completed: true };
  render(<Todo todo={todo} />);
  const todoElement = screen.getByTestId("todo-2");
  expect(todoElement).toBeInTheDocument();
  expect(todoElement).toHaveTextContent("make dinner");
  expect(todoElement).toContainHTML(
    `<div data-testid="todo-2"><strike><h1>make dinner</h1></strike></div>`
  );
});

test("matches snapshot", () => {
  const todo = { id: 1, title: "wash the dishes", completed: false };
  const tree = renderer.create(<Todo todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
