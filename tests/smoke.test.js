import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";

describe("project layout", () => {
  it("loads the app as an ES module", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).toContain('<script type="module" src="src/app/main.js">');
    expect(html).not.toContain("<script>\n/* ================= sample data");
    expect(html).toContain('onclick="addProject()"');
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

  it("allows inline due-date editing on tasks and subtasks in detail panels", () => {
    const main = readFileSync("src/app/main.js", "utf8");
    expect(main).toContain("duePill(ch.due,`updTask(${ch.id},'due',this.value,true);openDetail(${id})`,true)");
    expect(main).toContain('class="duelbl');
  });
});
