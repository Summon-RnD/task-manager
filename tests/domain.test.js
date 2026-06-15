import { describe, expect, it } from "vitest";
import { canonHardware, findClient, inferOwnerByDomain, norm } from "../src/lib/domain.js";

describe("domain", () => {
  it("infers owner from task keywords", () => {
    expect(inferOwnerByDomain("Train obstacle avoidance model")).toBe("ak");
    expect(inferOwnerByDomain("Wire motor CAN bus")).toBe("sk");
    expect(inferOwnerByDomain("Approve invoice payment")).toBe("jn");
    expect(inferOwnerByDomain("Random unrelated note")).toBeNull();
  });

  it("canonicalizes hardware spellings", () => {
    expect(canonHardware("install rs3 motors")).toBe("install RS03 motors");
    expect(canonHardware("fix d-wave board")).toBe("fix D-Wave board");
    expect(canonHardware("el 05 actuator")).toBe("EL05 actuator");
  });

  it("finds clients with punctuation tolerance", () => {
    expect(findClient("Demo for JCDecaux,")).toBe("JCDecaux");
    expect(findClient("meeting with jaycee decaux team")).toBe("JCDecaux");
    expect(findClient("internal standup")).toBeNull();
  });

  it("normalizes text for fuzzy matching", () => {
    expect(norm("JCDecaux,")).toBe(" jcdecaux ");
  });
});
