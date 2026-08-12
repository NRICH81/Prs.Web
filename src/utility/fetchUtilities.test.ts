import { describe, expect, it } from "vitest";
import { checkStatus, parseJSON, translateStatusToErrorMessage } from "./fetchUtilities";

describe("translateStatusToErrorMessage", () => {
  it("returns a sign-in message for 401", () => {
    expect(translateStatusToErrorMessage(401)).toBe("Please sign in again.");
  });

  it("returns a permission message for 403", () => {
    expect(translateStatusToErrorMessage(403)).toBe("You do not have permission to view the data requested.");
  });

  it("returns a generic message for other statuses", () => {
    expect(translateStatusToErrorMessage(500)).toBe("There was an error saving or retrieving data. Please try again.");
  });
});

describe("checkStatus", () => {
  it("resolves with the response when ok", async () => {
    const response = new Response("{}", { status: 200 });
    await expect(checkStatus(response)).resolves.toBe(response);
  });

  it("throws a translated error message when not ok", async () => {
    const response = new Response("Forbidden", { status: 403 });
    await expect(checkStatus(response)).rejects.toThrow("You do not have permission to view the data requested.");
  });
});

describe("parseJSON", () => {
  it("parses the response body as JSON", async () => {
    const response = new Response(JSON.stringify({ hello: "world" }));
    await expect(parseJSON(response)).resolves.toEqual({ hello: "world" });
  });
});
