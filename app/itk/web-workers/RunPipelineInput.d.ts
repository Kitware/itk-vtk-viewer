import PipelineInput from '../pipeline/PipelineInput.js';
import PipelineOutput from '../pipeline/PipelineOutput.js';
import WebWorkerInput from './WebWorkerInput.js';
interface RunPipelineInput extends WebWorkerInput {
    pipelinePath: string | object;
    pipelineBaseUrl: string;
    args: string[];
    outputs: PipelineOutput[];
    inputs: PipelineInput[];
}
export default RunPipelineInput;
