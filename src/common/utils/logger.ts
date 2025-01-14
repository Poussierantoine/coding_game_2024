export class Logger {
  logs: string[] = [];
  constructor() {
  }

  log(message: string) {
    this.logs.push(message);
  }

  printLogs() {
    // this.logs.forEach(log => console.log(log))
    console.log(this.logs);
  }
}