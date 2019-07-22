import * as axios from 'axios';

export const getRequest = async (path: string): Promise<axios.AxiosResponse<any>> => {
  try {
    const source = await axios.default.get(`https://discovery-stub.comtravo.com/${path}`, {
    withCredentials: true,
    auth: {
      username: 'ct_interviewee',
      password: 'supersecret'
    }});
    console.log(`success ${path}`)
    return source;
  } catch (error) {
    console.log(`error ${path}`)
    console.log(error)
    return await getRequest(path);
  }
}

