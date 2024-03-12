import { spawnSync } from 'child_process';
import path from 'path';
import { getPkgAllVersion } from './api';

export class GitUtil {
  private gitUrl?: string;
  private gitRoot?: string;
  private localWorkSpace?: string;

  constructor(workspaceOrGitUrl: string) {
    if (workspaceOrGitUrl.startsWith('https://') || workspaceOrGitUrl.startsWith('git@')) {
      this.gitUrl = workspaceOrGitUrl;
    } else {
      this.gitRoot = path.join(workspaceOrGitUrl, '.git');
      this.localWorkSpace = workspaceOrGitUrl;
      this.getGitUrlFromFile();
    }
  }

  private getGitUrlFromFile() {
    if (this.gitUrl) return;
    const res = spawnSync('git config --get remote.origin.url', {
      shell: true,
      cwd: this.localWorkSpace,
    });
    this.gitUrl = res.stdout.toString();
  }

  public async checkVersionExist(target: string) {
    const versions = await getPkgAllVersion();

    return versions.includes(target);
  }
}
