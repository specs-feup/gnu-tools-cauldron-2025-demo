import Query from "@specs-feup/lara/api/weaver/Query.js";
import { Loop } from "@specs-feup/clava/api/Joinpoints.js";
import { LoopAnnotationIdiom, LoopCharacterizer } from "@specs-feup/clava-code-transforms/LoopCharacterizer";

const lc = new LoopCharacterizer();

for (const loop of Query.search(Loop)) {
    const res = lc.characterize(loop);

    if (res.isValid) {
        lc.annotate(loop, res, LoopAnnotationIdiom.CLAVA);
    }
}