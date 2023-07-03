import colors from 'colors';
import { cosmiconfigSync } from 'cosmiconfig';
import fse from 'fs-extra';
import path from 'path';
import { ProjectType } from '../types/project';

export class Project {
  private _packageJsonDir: string;
  private _config: { type: ProjectType };

  constructor(private workspace: string) {
    this._packageJsonDir = path.join(this.workspace, 'package.json');
    const explorerResult = cosmiconfigSync('yawin', {
      packageProp: 'yawinConfig',
      stopDir: this.workspace,
    }).search(this.workspace);

    if (fse.existsSync(this._packageJsonDir)) {
      console.log(colors.grey('[INFO]') + 'init config', explorerResult);
      this._config = explorerResult?.config || {};
    } else {
      console.log(
        colors.red('[ERROR]') + '当前目录不存在package.json文件: ' + colors.bgBlue(`${workspace}`),
      );
    }
  }
}

export const currentProject = new Project(process.cwd());
