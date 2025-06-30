# clava-dac-2025-demo

This repository holds all scenarios for the Clava demo presed at the [University Demonstration at DAC 2025](https://www.dac.com/Attend/Students-Scholarships/University-Demonstration-at-DAC) ([abstract](docs/FCCM_2025_Demo_Night.pdf)).

This demo highlights the following repositories and their equivalent NPM packages:

* clava ([GitHub](https://github.com/specs-feup/clava) | [NPM](https://www.npmjs.com/package/@specs-feup/clava))

* clava-visualization ([GitHub](<https://github.com/specs-feup/clava-visualization>) | [NPM](www.npmjs.com/package/@specs-feup/clava-visualization))

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
git clone https://github.com/specs-feup/clava-dac-2025-demo
cd clava-dac-2025-demo

# build project
npm install
npm run build
```

Alternatively, you can use the provided Dockerfile to setup a container ready to run the demo

Note that whether you are using your local machine or a container, you need to have Vitis in the $PATH in order to run the flows that require interacting with it.

\*Windows and MacOS are supported on paper, but are untested

## Demo Scenarios

You can run a scenario with the command `npm run demo:<n>`, where `n` is the scenario ID, e.g., `npm run demo:00` to run the first scenario

* 00: use Clava to insert instrumentation and visualize Clava's AST using breakpoints
* 10: Function outlining
* 11: Struct flattening
* 20: Extended Task Graph (ETG) generation
* 30: Design space exploration of a kernel by calling Vitis iteratively
* 40: Offloading two pre-selected tasks to an FPGA using XRT
* 41: Annotating an ETG with Vitis synthesis reports and offloading the task with the most latency
