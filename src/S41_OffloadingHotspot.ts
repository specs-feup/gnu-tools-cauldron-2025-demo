import { BuiltinFpgaTarget } from "@specs-feup/hoopa/BuiltinFpgaPlatforms";
import { HoopaAlgorithm, HoopaConfig, OffloadingBackend, TaskGraphDecorator } from "@specs-feup/hoopa/HoopaAlgorithm";
import { HoopaAPI } from "@specs-feup/hoopa/HoopaAPI";
import { SingleHotspotTaskOptions } from "@specs-feup/hoopa/SingleHotspotTaskOptions";

const config = new HoopaConfig()
    .addDecorator(TaskGraphDecorator.VITIS_HLS)
    .addBackend(OffloadingBackend.XRT)
    .addAlgorithm(HoopaAlgorithm.SINGLE_HOTSPOT, {} as SingleHotspotTaskOptions)
    .addBuiltinFpgaTarget(BuiltinFpgaTarget.ZCU102);

const hoopa = new HoopaAPI("edge_detect", config, "outputs/s41", "edgedetect");
hoopa.runFromStart(false);