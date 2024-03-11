import path from 'path';
import { getFileDirBubble } from '../../libs/getFileDirBubble';

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

  private genNpmRc = async () => {
    const npmrcDir = path.join(this.workspace, '.npmrc');
    const gitDir = await getFileDirBubble('.git', this.workspace, 'directory');
    console.log('🚀 ~ gitDir:', gitDir);
  };
}
