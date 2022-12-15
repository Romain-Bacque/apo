// We need to manually create the mock because Jest expects mocks to be placed in the project root
// while packages installed via NPM get stored inside node_modules subdirectory.

import mockAxios from "jest-mock-axios";

export default mockAxios;
