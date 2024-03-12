import fse from 'fs-extra';

export const getPackageJsonData = (path: string) => {
  return fse.readJSONSync(path);
};
