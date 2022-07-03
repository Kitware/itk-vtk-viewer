import RunPipelineInput from "./RunPipelineInput.js"

interface IOInput extends RunPipelineInput {
  fileName: string
  mimeType: string
}

export default IOInput
