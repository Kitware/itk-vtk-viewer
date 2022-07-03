import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js';
import PipelineInput from '../pipeline/PipelineInput.js';
import PipelineOutput from '../pipeline/PipelineOutput.js';
declare function runPipeline(pipelineModule: PipelineEmscriptenModule, args: string[], outputs: PipelineOutput[], inputs: PipelineInput[]): Promise<any>;
export default runPipeline;
