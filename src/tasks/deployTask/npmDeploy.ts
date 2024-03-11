import path from 'path';

export class NpmDeploy {
  private workspace: string;
  constructor(workspace: string) {
    this.workspace = workspace;
  }

  public async run() {
    try {
      await this.genNpmRc();
    } catch (error) {
      //
    }
  }

  private genNpmRc = () => {
    const npmrcDir = path.join(this.workspace, '.npmrc');
  };
}
