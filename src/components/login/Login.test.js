import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test('username input must be rendered', () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test('password input must be rendered', () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test('login button must be rendered', () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument();
});

test('username input should be empty', () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test('password input should be empty', () => {
  render(<Login />);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordrInputEl.value).toBe("");
});

test('login button must be disabled', () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeDisabled();
});

test('loading should not be rendered', () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).not.toHaveTextContent(/please wait/i);
});

test('error message should be not visible', () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test('username input should be change', () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(userInputEl , {target:{ value: testValue }})
  expect(userInputEl.value).toBe(testValue);
});

test('password input should be change', () => {
  render(<Login />);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordrInputEl , {target:{ value: testValue }})
  expect(passwordrInputEl.value).toBe(testValue);
});

test('login button must not be disabled when inputs exist', () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl , {target:{ value: testValue }})
  fireEvent.change(passwordrInputEl , {target:{ value: testValue }})

  expect(buttonInputEl).not.toBeDisabled();
});

test('loading should be rendered when clicked', () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl , {target:{ value: testValue }})
  fireEvent.change(passwordrInputEl , {target:{ value: testValue }})
  fireEvent.click(buttonInputEl)


  expect(buttonInputEl).toHaveTextContent(/please wait/i);
});

test('loading should not be rendered after fetching', async () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl , {target:{ value: testValue }})
  fireEvent.change(passwordrInputEl , {target:{ value: testValue }})
  fireEvent.click(buttonInputEl)

  await waitFor(() => expect(buttonInputEl).not.toHaveTextContent(/please wait/i));
});

test('user should be rendered after fetching', async () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordrInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl , {target:{ value: testValue }})
  fireEvent.change(passwordrInputEl , {target:{ value: testValue }})
  fireEvent.click(buttonInputEl)

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});