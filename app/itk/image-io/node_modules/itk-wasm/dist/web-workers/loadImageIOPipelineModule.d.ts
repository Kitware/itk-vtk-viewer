import IOInput from './IOInput.js';
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js';
declare function loadImageIOPipelineModule(input: IOInput, postfix: string): Promise<PipelineEmscriptenModule>;
export default loadImageIOPipelineModule;
