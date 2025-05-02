import Query from "@specs-feup/lara/api/weaver/Query.js";
import Clava from "@specs-feup/clava/api/clava/Clava.js";
import { FunctionJp } from "@specs-feup/clava/api/Joinpoints.js";
import { ArrayFlattener } from "@specs-feup/clava-code-transforms/ArrayFlattener";
import { FoldingPropagationCombiner } from "@specs-feup/clava-code-transforms/FoldingPropagationCombiner";

const flattener = new ArrayFlattener();

for (const fun of Query.search(FunctionJp)) {
    const n = flattener.flattenAllInFunction(fun);

    console.log(`Flattened ${n} arrays in function ${fun.name}`);
}
flattener.flattenAllGlobals();

Clava.rebuild();
const foldProg = new FoldingPropagationCombiner(true);

for (const fun of Query.search(FunctionJp)) {
    const nPasses = foldProg.doPassesUntilStop(fun);

    console.log(`Applied constant folding and propagation in ${nPasses}`);
}