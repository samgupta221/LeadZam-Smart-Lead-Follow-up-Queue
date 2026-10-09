import { describe, expect, it } from "vitest";
import { fmt } from "./SlaChip";
import { validate } from "./validate";
describe("fmt", () => {
  it("formats minutes, hours and days", () => {
    expect(fmt(12)).toBe("12m"); expect(fmt(-135)).toBe("2h 15m"); expect(fmt(1440)).toBe("1d");
  });
});
describe("validate", () => {
  it("requires an outcome", () => expect(validate()).toHaveLength(1));
  it("requires schedule + note for Meeting Booked", () => expect(validate("1", undefined, "")).toHaveLength(2));
  it("passes when complete", () => expect(validate("1", "Today (+2h)", "Demo agreed")).toEqual([]));
  it("voicemail needs nothing else", () => expect(validate("4")).toEqual([]));
});
