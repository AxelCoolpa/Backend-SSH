import App from './app';

export class Server {
  private readonly app: App;

  constructor() {
    this.app = new App();
  }

  public start(): void {
    this.app.configure();
    this.app.start();
  }
}
