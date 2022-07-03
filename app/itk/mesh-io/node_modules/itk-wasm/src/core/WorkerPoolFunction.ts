interface WorkerPoolFunctionResult { webWorker: Worker }

type WorkerPoolFunction = (webWorker: Worker | null, ...args: any[]) => Promise<WorkerPoolFunctionResult>

export default WorkerPoolFunction
