import { Loop } from "@specs-feup/clava/api/Joinpoints.js";
import { ExtendedTaskGraphAPI } from "@specs-feup/extended-task-graph/ExtendedTaskGraphAPI";
import { GenFlowConfig } from "@specs-feup/extended-task-graph/GenFlowConfig";
import { RegularTask } from "@specs-feup/extended-task-graph/RegularTask";
import { SubsetTransform } from "@specs-feup/extended-task-graph/SubsetTransforms";
import { TaskMerger } from "@specs-feup/extended-task-graph/TaskMerger";
import { TaskSplitter } from "@specs-feup/extended-task-graph/TaskSplitter";
import { TransFlowConfig } from "@specs-feup/extended-task-graph/TransFlowConfig";
import Query from "@specs-feup/lara/api/weaver/Query.js";

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

// Increase local granularity by splitting a task in two
const task = etg.getTaskByName("convolve2d_rep2")! as RegularTask;

// we choose a split point at the beginning of the second top-level loop
let foundFirstLoop = false;
let secondLoop = null;
task.getFunction().body.stmts.forEach((stmt) => {
    if (stmt instanceof Loop) {
        if (!foundFirstLoop) {
            foundFirstLoop = true;
        }
        else {
            secondLoop = stmt;
            return;
        }
    }
});

const splitter = new TaskSplitter();
const [newTaskA, newTaskB] = splitter.splitTask(etg, task, secondLoop!);

api.dumpTaskGraph(etg, "split");
api.generateSourceCode("src/split");