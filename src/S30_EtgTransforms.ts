import { ExtendedTaskGraphAPI } from "@specs-feup/extended-task-graph/ExtendedTaskGraphAPI";
import { SubsetTransform } from "@specs-feup/extended-task-graph/SubsetTransforms";
import { TransFlowConfig } from "@specs-feup/extended-task-graph/TransFlowConfig";

const topFunctionName = "edge_detect";
const outputDir = "outputs";
const appName = "s30";
const api = new ExtendedTaskGraphAPI(topFunctionName, outputDir, appName);

// Run code transformation flow
const config = new TransFlowConfig();
config.transformRecipe = [
    SubsetTransform.ArrayFlattener,
    SubsetTransform.ConstantFoldingPropagation,
    SubsetTransform.StructDecomposition,
    SubsetTransform.ConstantFoldingPropagation
];
api.runCodeTransformationFlow(config);
