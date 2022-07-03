import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js';
declare function loadPipelineModule(pipelinePath: string | object, baseUrl: string): Promise<PipelineEmscriptenModule>;
export default loadPipelineModule;
