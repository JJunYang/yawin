import axios, { AxiosInstance } from 'axios';
import dotEnv from 'dotenv';
dotEnv.config();

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/',
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export const getAllPkg = async (type = 'npm') => {
  try {
    const res = await axiosInstance.request({
      url: `https://api.github.com/user/packages?package_type=${type}`,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 获取 npm 包的所有版本
 * @returns
 */
export const getPkgAllVersion = async (type = 'npm', name = 'yawin') => {
  try {
    const { data } = await axiosInstance.request({
      url: `https://api.github.com/user/packages/${type}/${name}/versions`,
    });
    const versions = data.map((item: any) => item.name);

    return versions;
  } catch (error) {
    console.error(error);
  }
};
