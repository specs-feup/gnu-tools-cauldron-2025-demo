# gnu-tools-cauldron-2025-demo

This repository holds all scenarios for the Clava demo presed at the [GNU Tools Cauldron 2025](https://conf.gnu-tools-cauldron.org/opo25/). Slides are available [here](docs/GNU_Tools_Cauldron_Presentation.pptx).

This demo highlights the following repositories and their equivalent NPM packages:

Package | Description | GitHub | NPM
---|---|---|---
clava | The core distribution of the Clava C/C++ source-to-source compiler | [GitHub](https://github.com/specs-feup/clava) | [NPM](https://www.npmjs.com/package/@specs-feup/clava)
clava-visualization | Renders an interactive web view of the program's AST, in a breakpoint-like fashion | [GitHub](<https://github.com/specs-feup/clava-visualization>) | [NPM](www.npmjs.com/package/@specs-feup/clava-visualization)
clava-code-transforms | A set of advanced code transformations for Clava (function outlining and voidification, array and struct flattening, constant folding and propagation, loop static iteration annotation) | [GitHub](https://github.com/specs-feup/clava-code-transforms) | [NPM](https://www.npmjs.com/package/@specs-feup/clava-code-transforms)
extended-task-graph | Generates an Extended Task Graph (ETG) representation of an application, with flexible granularity changes through task merging and splitting | [GitHub](https://github.com/specs-feup/extended-task-graph) | [NPM](https://www.npmjs.com/package/@specs-feup/extended-task-graph)
clava-vitis-integration | Integration with Vitis HLS, allowing for the automated synthesis and place-and-route of selected functions, and the programatic insertion and configurations of HLS directives | [GitHub](https://github.com/specs-feup/clava-vitis-integration) | [NPM](https://www.npmjs.com/package/@specs-feup/clava-vitis-integration)
hoopa  | Hoopa (Holistic optimization and partitioning algorithms) is a collection of HW/SW partitioning policies and algorithms that can partition and optimize an application for a CPU-FPGA system | [GitHub](https://github.com/specs-feup/hoopa) | [NPM](https://www.npmjs.com/package/@specs-feup/hoopa)

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
git clone https://github.com/specs-feup/gnu-tools-cauldron-2025-demo
cd gnu-tools-cauldron-2025-demo

# build project
npm install
npm run build
```

Note that you need to have Vitis in $PATH in order to run scenario 30 and 41.

\*Windows and MacOS are supported on paper, but are untested

## Demo Scenarios

You can run a scenario with the command `npm run demo:<n>`, where `n` is the scenario ID, e.g., `npm run demo:00` to run the first scenario

* 10: use Clava to insert instrumentation and visualize Clava's AST using breakpoints
* 11: Function outlining
* 12: Struct flattening
* 20: Extended Task Graph (ETG) generation
* 30: Design space exploration of a kernel by calling Vitis iteratively
* 40: Offloading two pre-selected tasks to an FPGA using XRT
* 41: Annotating an ETG with Vitis synthesis reports and offloading the task with the most latency

## Video Teaser

This video teaser is from a previous demonstration of this demo, but its contents are mostly the same:

[![YouTube Video Teaser](https://img.youtube.com/vi/JJVgWboF8OU/0.jpg)](https://www.youtube.com/watch?v=JJVgWboF8OU)
