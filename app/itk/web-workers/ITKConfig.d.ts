interface ITKConfig {
    webWorkersUrl?: string;
    pipelineWorkerUrl?: string;
    pipelinesUrl: string;
    imageIOUrl: string;
    meshIOUrl: string;
    [key: string]: string | undefined;
}
export default ITKConfig;
