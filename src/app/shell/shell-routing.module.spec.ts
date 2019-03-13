import { ShellRoutingModule } from './shell-routing.module';

describe('ShellRoutingModule', () => {
  let shellRoutingModule: ShellRoutingModule;

  beforeEach(() => {
    shellRoutingModule = new ShellRoutingModule();
  });

  it('should create an instance', () => {
    expect(shellRoutingModule).toBeTruthy();
  });
});
