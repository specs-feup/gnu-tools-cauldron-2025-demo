import { StructFlattener } from "@specs-feup/clava-code-transforms/StructFlattener";

const decomp = new StructFlattener(true);
const structNames = decomp.decomposeAll();

console.log("Flattened structs: ", structNames);
