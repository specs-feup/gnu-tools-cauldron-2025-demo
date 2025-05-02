import { ExtendedTaskGraphAPI } from "@specs-feup/extended-task-graph/ExtendedTaskGraphAPI";
import { GenFlowConfig } from "@specs-feup/extended-task-graph/GenFlowConfig";
import { RegularTask } from "@specs-feup/extended-task-graph/RegularTask";
import { SubsetTransform } from "@specs-feup/extended-task-graph/SubsetTransforms";
import { TaskMerger } from "@specs-feup/extended-task-graph/TaskMerger";
import { TransFlowConfig } from "@specs-feup/extended-task-graph/TransFlowConfig";

const topFunctionName = "edge_detect";
const outputDir = "outputs";
const appName = "edgedetect-transflow";
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
const etg = api.runTaskGraphGenerationFlow(config2)!;

// Decrease local granularity by merging two tasks
const t1 = etg.getTaskByName("convolve2d_rep2")! as RegularTask;
const t2 = etg.getTaskByName("combthreshold")! as RegularTask;

const merger = new TaskMerger();
merger.mergeTasks(etg, t1, t2);

api.dumpTaskGraph(etg, "merged");
api.generateSourceCode("src/merged");
