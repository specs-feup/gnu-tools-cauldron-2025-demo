import Query from "@specs-feup/lara/api/weaver/Query.js";
import { FileJp, FunctionJp, Loop } from "@specs-feup/clava/api/Joinpoints.js";
import { AmdPlatform, ClockUnit, OutputFormat, UncertaintyUnit, VitisHlsConfig } from "@specs-feup/clava-vitis-integration/VitisHlsConfig";
import { VitisHls } from "@specs-feup/clava-vitis-integration/VitisHls";
import { VitisSynReport } from "@specs-feup/clava-vitis-integration/VitisReports";
import { HlsUnroll } from "@specs-feup/clava-vitis-integration/HlsUnroll";
import { ArrayPartitionType, HlsArrayPartition } from "@specs-feup/clava-vitis-integration/HlsArrayPartition";

function synthesize(fun: FunctionJp): VitisSynReport {
    const vitis = new VitisHls();

    const config = new VitisHlsConfig(fun.name)
        .addSource(fun.getAncestor("file") as FileJp)
        .setClock({ value: 100, unit: ClockUnit.MEGAHERTZ })
        .setUncertainty({ value: 2, unit: UncertaintyUnit.NANOSECOND })
        .setPlatform(AmdPlatform.ZCU102)
        .setOutputFormat(OutputFormat.VITIS_XO);
    vitis.setConfig(config);

    return vitis.synthesize();
}

function insertDirectives(fun: FunctionJp): void {
    // get the loop inside the dot product function
    const dotProdLoop = Query.searchFrom(fun, Loop).first()!;

    // insert directive to unroll it by a factor of 4
    const unroll = new HlsUnroll(4, true, false);
    unroll.attach(dotProdLoop);

    // get both array parameters
    const param1 = fun.params[0];
    const param2 = fun.params[1];

    // insert array partition directives for both parameters
    const arraypart1 = new HlsArrayPartition(param1.name, 1, 4, false, ArrayPartitionType.CYCLIC);
    const arraypart2 = new HlsArrayPartition(param2.name, 1, 4, false, ArrayPartitionType.CYCLIC);
    arraypart1.attach(param1);
    arraypart2.attach(param2);
}


// get the dot product function
const fun = Query.search(FunctionJp, { name: "dotProduct" }).first()!;

// synthesize to get a baseline
const report1 = synthesize(fun);

// generate a new design by inserting some HLS directives
insertDirectives(fun);

// synthesize again to get the new report
const report2 = synthesize(fun);

// compare reports
console.log(`Latency (cycles): ${report1.latencyWorst}  vs ${report2.latencyWorst}`);
console.log(`      BRAM usage: ${report1.perBRAM.toFixed(2)}% vs ${report2.perBRAM.toFixed(2)}%`);
console.log(`       DSP usage: ${report1.perDSP.toFixed(2)}% vs ${report2.perDSP.toFixed(2)}%`);
console.log(`        FF usage: ${report1.perFF.toFixed(2)}% vs ${report2.perFF.toFixed(2)}%`);
console.log(`       LUT usage: ${report1.perLUT.toFixed(2)}% vs ${report2.perLUT.toFixed(2)}%`);
