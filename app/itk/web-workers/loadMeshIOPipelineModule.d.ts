import IOInput from './IOInput.js';
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js';
declare function loadMeshIOPipelineModule(input: IOInput, postfix: string): Promise<PipelineEmscriptenModule>;
export default loadMeshIOPipelineModule;
