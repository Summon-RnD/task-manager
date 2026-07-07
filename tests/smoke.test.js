import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";

describe("project layout", () => {
  it("loads the app as an ES module", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('<script type="module" src="src/app/main.js">');
    expect(html).not.toContain("<script>\n/* ================= sample data");
    expect(html).toContain('onclick="addProject()"');
  });

  it("pins task bar avatar and title during horizontal scroll", () => {
    const main = readFileSync("src/app/main.js", "utf8");
    expect(main).toContain("function pinBars()");
    expect(main).toContain('class="gpin"');
  });

  it("renders project name speech bubbles with owner avatar", () => {
    const main = readFileSync("src/app/main.js", "utf8");
    expect(main).toContain('class="gsumlbl"');
    expect(main).toMatch(/gsumlbl[\s\S]*class="gpin"/);
  });

  it("keeps project title and progress bar in separate rows", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain(".gsumtrack{position:absolute;top:4px;display:flex;flex-direction:column");
    expect(html).toContain(".gsumrow .gtrack{height:auto;overflow:visible}");
    const main = readFileSync("src/app/main.js", "utf8");
    expect(main).toMatch(/gtrack" style="height:\$\{ph\+34\}px"/);
  });

  it("exports core lib modules", async () => {
    const domain = await import("../src/lib/domain.js");
    const tree = await import("../src/lib/tree.js");
    const dates = await import("../src/lib/dates.js");
    const capture = await import("../src/lib/capture.js");
    expect(domain.inferOwnerByDomain).toBeTypeOf("function");
    expect(tree.createTaskFactory).toBeTypeOf("function");
    expect(dates.createDateHelpers).toBeTypeOf("function");
    expect(capture.mockTranscript).toBeTypeOf("function");
  });
});
