import * as axios from 'axios';
import Flights from './models/Flights'

export const getRequest = async (path: string): Promise<axios.AxiosResponse<Flights>> => {
  try {
    const source = await axios.default.get(`https://discovery-stub.comtravo.com/${path}`, {
      withCredentials: true,
      auth: {
        username: 'ct_interviewee',
        password: 'supersecret'
      }});
    console.log(`success ${path}`);
    return source;
  } catch (error) {
    console.log(`error ${path}`);
    console.log(error);  //LOG error
    return await getRequest(path);
  }
}

