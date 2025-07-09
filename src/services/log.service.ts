import LogModel, { ILog } from "../models/log.model";

export class LogService {
  createLog(data: Partial<ILog>) {
    return LogModel.create(data);
  }

  getLogs() {
    return LogModel.find().lean().exec();
  }
}
