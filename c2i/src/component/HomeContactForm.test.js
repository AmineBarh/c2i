import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomeContactForm from "./HomeContactForm";

// Mock fetch
global.fetch = jest.fn();

// Mock console.error to avoid cluttering test output
const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

describe("HomeContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs", () => {
    render(<HomeContactForm />);
    // Note: The labels in the component are "Nom", "Numéro de téléphone", "Email", "Message"
    // Using getAllByLabelText or regex to be robust
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Envoyer le message/i })).toBeInTheDocument();
  });

  test("updates input values", () => {
    render(<HomeContactForm />);
    const nameInput = screen.getByLabelText(/Nom/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  test("submits form successfully", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Success" }),
    });

    // Mock alert
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<HomeContactForm />);

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/Numéro de téléphone/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: "Hello" } });

    fireEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    expect(screen.getByText(/Envoi.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/contact"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "John",
            phone: "123",
            email: "test@example.com",
            message: "Hello",
          }),
        })
      );
    });

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Message sent successfully!");
    });

    // Form should be reset
    expect(screen.getByLabelText(/Nom/i).value).toBe("");

    alertSpy.mockRestore();
  });

  test("handles submission error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network Error"));
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<HomeContactForm />);

    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: "John" } });
    fireEvent.click(screen.getByRole("button", { name: /Envoyer le message/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith("Network Error");
    });

    alertSpy.mockRestore();
  });
});
