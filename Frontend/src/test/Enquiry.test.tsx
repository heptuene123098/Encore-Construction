import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Enquiry from "@/pages/Enquiry";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/components/OfficeMap", () => ({
  default: () => <div data-testid="office-map" />,
}));

describe("Enquiry form", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("submits the enquiry form to the backend mail endpoint", async () => {
    render(<Enquiry />);

    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/phone number/i), {
      target: { value: "08012345678" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Property Purchase" },
    });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), {
      target: { value: "I would like to schedule a visit." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const fetchMock = vi.mocked(fetch);
    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(url).toBe("/api/enquiries");
    expect(options.method).toBe("POST");
    expect(options.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(options.body as string)).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "08012345678",
      subject: "Property Purchase",
      message: "I would like to schedule a visit.",
    });
  });
});
