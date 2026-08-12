import { describe, expect, it } from "vitest";
import { formatPhoneNumber, getTextBackgroundByStatus, money } from "./formatUtilities";

describe("formatPhoneNumber", () => {
  it("formats a 10-digit phone number", () => {
    expect(formatPhoneNumber("5551234567")).toBe("(555) 123-4567");
  });

  it("returns undefined for an empty string", () => {
    expect(formatPhoneNumber("")).toBeUndefined();
  });
});

describe("getTextBackgroundByStatus", () => {
  it("returns the correct class for each known status", () => {
    expect(getTextBackgroundByStatus("APPROVED")).toBe("text-bg-secondary");
    expect(getTextBackgroundByStatus("NEW")).toBe("text-bg-warning");
    expect(getTextBackgroundByStatus("REVIEW")).toBe("text-bg-info");
    expect(getTextBackgroundByStatus("REJECTED")).toBe("text-bg-danger");
  });

  it("is case-insensitive", () => {
    expect(getTextBackgroundByStatus("approved")).toBe("text-bg-secondary");
  });

  it("returns an empty string for an unknown status", () => {
    expect(getTextBackgroundByStatus("UNKNOWN")).toBe("");
  });
});

describe("money", () => {
  it("formats a number as USD currency", () => {
    expect(money(1234.5)).toBe("$1,234.50");
  });

  it("formats zero correctly", () => {
    expect(money(0)).toBe("$0.00");
  });
});
