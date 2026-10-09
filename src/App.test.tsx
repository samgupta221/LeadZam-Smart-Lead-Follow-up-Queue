// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);
const ready = async () => { render(<App />); await screen.findByText(/Overdue follow-ups \(4\)/); };

describe("Follow-up Queue", () => {
  it("shows a loading state, then 18 leads grouped 4 / 9 / 5", async () => {
    render(<App />);
    expect(screen.getByRole("region", { name: "Lead queue" }).getAttribute("aria-busy")).toBe("true");
    await screen.findByText(/Overdue follow-ups \(4\)/);
    expect(screen.getByText(/Scheduled today \(9\)/)).toBeTruthy();
    expect(screen.getByText(/Upcoming later this week \(5\)/)).toBeTruthy();
    expect(screen.getByText("14/32 (44%)")).toBeTruthy();
  });
  it("filters by source and keeps the detail pane in sync", async () => {
    await ready();
    fireEvent.click(screen.getByRole("button", { name: /^Website \(3\)/ }));
    const detail = screen.getByRole("complementary", { name: "Lead details" });
    expect(within(detail).getByRole("heading").textContent).toMatch(/Anita Desai|Elena Rostova|Hana Kim/);
    expect(screen.queryByText("Marcus Vance")).toBeNull();
  });
  it("blocks saving until the form is valid, then advances the queue", async () => {
    await ready();
    fireEvent.click(screen.getAllByRole("button", { name: /^Call / })[0]);
    const dlg = screen.getByRole("dialog");
    fireEvent.click(within(dlg).getByRole("button", { name: /Save & Close/ }));
    expect(within(dlg).getByRole("alert").textContent).toMatch(/Choose a call outcome/);
    fireEvent.keyDown(dlg, { key: "4" });                // Voicemail: no extra fields required
    fireEvent.click(within(dlg).getByRole("button", { name: /Save & Next/ }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("15/32 (47%)")).toBeTruthy();
  });
  it("reaches the all-clear state", async () => {
    await ready();
    fireEvent.click(screen.getByRole("button", { name: /Demo: clear queue/ }));
    expect(await screen.findByText(/all caught up for today/i)).toBeTruthy();
  });
});
