import path from 'path';
import { ProjectType } from '../types/project';

export class Project {
  private _packageJsonDir: string;
  private type: ProjectType;

  constructor(private workspace: string) {
    this._packageJsonDir = path.join(this.workspace, 'package.json');
  }
}

export const currentProject = new Project(process.cwd());
