import { BuiltinFpgaTarget } from "@specs-feup/hoopa/BuiltinFpgaPlatforms";
import { HoopaAlgorithm, HoopaConfig, OffloadingBackend } from "@specs-feup/hoopa/HoopaAlgorithm";
import { HoopaAPI } from "@specs-feup/hoopa/HoopaAPI";
import { PredefinedTasksOptions } from "@specs-feup/hoopa/PredefinedTasksOptions";

const config = new HoopaConfig()
    .addBackend(OffloadingBackend.XRT)
    .addAlgorithm(HoopaAlgorithm.PREDEFINED_TASKS, {
        taskNames: ["edge_detect_out0", "convolve2d"]
    } as PredefinedTasksOptions)
    .addBuiltinFpgaTarget(BuiltinFpgaTarget.ZCU102);

const hoopa = new HoopaAPI("edge_detect", config, "outputs/s40", "edgedetect");
hoopa.runFromStart(false);