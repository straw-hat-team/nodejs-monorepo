export class OperationIdMissingError extends Error {
  operationPath: string;
  operationMethod: string;

  constructor(operationPath: string, operationMethod: string) {
    super();
    this.operationPath = operationPath;
    this.operationMethod = operationMethod;
    this.message = `Operation Id is missing for "${operationMethod} ${operationPath} "`;
  }
}
