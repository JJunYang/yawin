import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { REPOSITORY_NAME } from '../tasks/initTask/const';

/**
 * 下载github中的项目
 * @param targetPath 下载的目标目录
 * @returns zip的
 */
export const downLoadZip = async (targetPath = '.', branchName = 'master'): Promise<string> => {
  const url = `https://github.com/JJunYang/${REPOSITORY_NAME}/archive/${branchName}.tar.gz`;
  const response = await axios({ url: url, method: 'GET', responseType: 'arraybuffer' });
  const zipPath = path.join(targetPath, `${REPOSITORY_NAME}-${branchName}.tar.gz`);
  fs.writeFileSync(zipPath, response.data);

  return zipPath;
};

/**
 * 通过fromPath路径生成绝对路径
 * @param fromPath 待生成绝对路径的目录
 * @param currentWorkSpace 生成绝对路径的依照目录，默认为当前的工作目录process.cwd()
 * @returns 绝对路径
 */
export const getAbsolutePath = (fromPath: string, currentWorkSpace = process.cwd()) => {
  const targetPath = path.isAbsolute(fromPath) ? fromPath : path.join(currentWorkSpace, fromPath);
  return targetPath;
};

/**
 * 删除目标文件或者清空文件夹
 * @param fileList 待删除的文件和文件夹信息，path：文件地址；isDir：是否为文件夹
 */
export const removeFiles = (fileList: { path: string; isDir: boolean }[]) => {
  fileList.forEach((item) => {
    if (item.isDir) {
      fs.emptyDirSync(item.path);
      fs.rmdirSync(item.path);
    } else {
      fs.rmSync(item.path);
    }
  });
};
