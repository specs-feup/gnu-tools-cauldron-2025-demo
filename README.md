# clava-fccm-2025-demo

This repository holds all scenarios for the Clava demo demonstrated at [FCCM 2025](https://www.fccm.org/) ([abstract](docs/FCCM_2025_Demo_Night.pdf)).

This demo highlights the following repositories and their equivalent NPM packages:

* clava ([GitHub](https://github.com/specs-feup/clava) | [NPM](https://www.npmjs.com/package/@specs-feup/clava))

* clava-code-transforms ([GitHub](https://github.com/specs-feup/clava-code-transforms) | [NPM](https://www.npmjs.com/package/@specs-feup/clava-code-transforms))

* extended-task-graph ([GitHub](https://github.com/specs-feup/extended-task-graph) | [NPM](https://www.npmjs.com/package/@specs-feup/extended-task-graph))

* clava-vitis-integration ([GitHub](https://github.com/specs-feup/clava-vitis-integration) | [NPM](https://www.npmjs.com/package/@specs-feup/clava-vitis-integration))

* hoopa  ([GitHub](https://github.com/specs-feup/hoopa) | [NPM](https://www.npmjs.com/package/@specs-feup/hoopa))

## Setup

You need to use a Linux* distribution with the following versions of Node.js and Java installed. A clang distribution is not strictly required, but recommended:

```bash
# node.js v16 or v18 required, JRE v17 or higher required
apt-get update
apt-get install -y curl openjdk-17-jdk
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# optional C/C++ related packages, install to ensure full compatibility and reproducibility
apt-get install -y gnupg software-properties-common build-essential clang

# clone the repository
# alternatively, download it as a .zip file, extract it, and open a terminal on the folder
git clone https://github.com/specs-feup/clava-fccm-2025-demo
cd clava-fccm-2025-demo

# build project
npm install
npm run build
```

Alternatively, you can use the provided Dockerfile to setup a container ready to run the demo

Note that whether you are using your local machine or a container, you need to have Vitis in the $PATH in order to run the flows that require interacting with it.

\*Windows and MacOS are supported on paper, but are untested

## Demo Scenarios

You can run a scenario with the command `npm run demo:s<n>`, where `n` is the scenario ID, e.g., `npm run demo:s00` to run the first scenario

* Scenario 0: Clava basics
  * S00: use Clava to insert instrumentation
  * S01: visualize Clava's AST using breakpoints
* Scenario 1: Code transformations
  * S10: Array flattening and constant folding/propagation
  * S11: Struct flattening
  * S12: Loop static iteration count annotation
* Scenario 2: Extended Task Graph (ETG)
  * S20: Reduction to a C/C++ subset in preparation for ETG generation
  * S21: ETG generation
  * S22: Decreasing the ETG's granularity: task merging
  * S23: Increasing the ETG's granularity: task splitting
* Scenario 3: Integration with Vitis HLS
  * S30: Design space exploration of a kernel
* Scenario 4: Holistic Optimization and Partitioning Algorithms (Hoopa)
  * S40: Offloading two pre-selected tasks to an FPGA using XRT
  * S41: Annotating an ETG with Vitis synthesis reports and offloading the task with the most latency
