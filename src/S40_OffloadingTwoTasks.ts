import { HoopaAlgorithm, HoopaConfig, OffloadingBackend } from "@specs-feup/hoopa/HoopaAlgorithm";
import { HoopaAPI } from "@specs-feup/hoopa/HoopaAPI";
import { PredefinedTasksConfig } from "@specs-feup/hoopa/PredefinedTasksConfig";

const config: HoopaConfig = {
    decorators: [],
    backends: [OffloadingBackend.XRT],
    algorithm: {
        name: HoopaAlgorithm.PREDEFINED_TASKS,
        taskNames: ["convolve2d_rep2", "combthreshold"]
    } as PredefinedTasksConfig,
    target: "targets/ZCU102.yaml"
};

const hoopa = new HoopaAPI("edge_detect", config, "outputs/s40", "edgedetect");
hoopa.runFromStart(false);