import { Outliner } from "@specs-feup/clava-code-transforms/Outliner";
import { WrapperStmt } from "@specs-feup/clava/api/Joinpoints.js";
import Query from "@specs-feup/lara/api/weaver/Query.js";

const pragmas = Query.search(WrapperStmt).get();
const begin = pragmas.find((stmt) => stmt.code.trim().includes("begin_outline"))!;
const end = pragmas.find((stmt) => stmt.code.trim().includes("end_outline"))!;

const outliner = new Outliner();
outliner.outlineWithName(begin, end, "outlinedFunction");

begin.detach();
end.detach();
