import { HoopaAlgorithm, HoopaConfig, OffloadingBackend, TaskGraphDecorator } from "@specs-feup/hoopa/HoopaAlgorithm";
import { HoopaAPI } from "@specs-feup/hoopa/HoopaAPI";

const config: HoopaConfig = {
    decorators: [TaskGraphDecorator.VITIS_HLS],
    backends: [OffloadingBackend.XRT],
    algorithm: {
        name: HoopaAlgorithm.SINGLE_HOTSPOT
    },
    target: "targets/ZCU102.yaml"
};

const hoopa = new HoopaAPI("edge_detect", config, "outputs/s41", "edgedetect");
hoopa.runFromStart(false);