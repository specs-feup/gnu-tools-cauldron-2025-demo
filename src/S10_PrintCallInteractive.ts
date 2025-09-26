import { FunctionJp } from "@specs-feup/clava/api/Joinpoints.js";
import Query from "@specs-feup/lara/api/weaver/Query.js";
import ClavaJoinPoints from "@specs-feup/clava/api/clava/ClavaJoinPoints.js";
import VisualizationTool from "@specs-feup/clava-visualization/api/VisualizationTool.js";

await VisualizationTool.visualize();

for (const fun of Query.search(FunctionJp, { isImplementation: true })) {
    const print = `printf("${fun.name} was called");`;
    const printStmt = ClavaJoinPoints.stmtLiteral(print);
    fun.body.insertBegin(printStmt);
}

await VisualizationTool.visualize();