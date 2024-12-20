import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../components/landingPage/LandingPage";
import { loginUser } from "../helpers/apiCalls"; // Mock this API

jest.mock("../helpers/apiCalls");

test("successful login navigates to /home", async () => {
  loginUser.mockResolvedValueOnce({ access: "mockAccess", refresh: "mockRefresh" });
  render(<LandingPage />);
  screen.getByRole("button", { name: /login/i }).click();

  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  expect(await screen.findByText(/Welcome to/i)).toBeInTheDocument(); // Or a mock navigate call
});

test("displays error message on login failure", async () => {
  loginUser.mockRejectedValueOnce(new Error("Invalid credentials"));
  render(<LandingPage />);
  screen.getByRole("button", { name: /login/i }).click();

  fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testuser" } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "wrongpassword" } });

  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  expect(await screen.findByText(/Please try again/i)).toBeInTheDocument();
});

