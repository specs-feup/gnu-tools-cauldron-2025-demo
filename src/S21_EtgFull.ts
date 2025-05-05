import { ExtendedTaskGraphAPI } from "@specs-feup/extended-task-graph/ExtendedTaskGraphAPI";
import { GenFlowConfig } from "@specs-feup/extended-task-graph/GenFlowConfig";
import { SubsetTransform } from "@specs-feup/extended-task-graph/SubsetTransforms";
import { TransFlowConfig } from "@specs-feup/extended-task-graph/TransFlowConfig";

const topFunctionName = "edge_detect";
const outputDir = "outputs";
const appName = "s31";
const api = new ExtendedTaskGraphAPI(topFunctionName, outputDir, appName);

// Run code transformation flow
const config1 = new TransFlowConfig();
config1.transformRecipe = [
    SubsetTransform.ArrayFlattener,
    SubsetTransform.ConstantFoldingPropagation,
    SubsetTransform.StructDecomposition,
    SubsetTransform.ConstantFoldingPropagation
];
api.runCodeTransformationFlow(config1);

// Run ETG generation flow
const config2 = new GenFlowConfig();
const etg = api.runTaskGraphGenerationFlow(config2);