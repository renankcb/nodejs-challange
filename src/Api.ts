import * as axios from 'axios';
import Flights from './models/Flights'

class Api {
  async getRequest(path: string): Promise<axios.AxiosResponse<Flights>> {
    return await this.axiosRequest(path, process.hrtime(), 700);
  }

  private async axiosRequest(path: string, start: [number, number], timeout: number): Promise<axios.AxiosResponse<Flights>>  {
    try {
      console.log(`start ${path}`) //LOG start
      const source = await axios.default.get(`https://discovery-stub.comtravo.com/${path}`, {
        withCredentials: true,
        timeout: timeout,
        //move credentials and urls to env file
        auth: {
          username: 'ct_interviewee',
          password: 'supersecret'
        }
      });
      console.log(`success ${path}`); //LOG success
      return source;
    } catch (error) {
      console.log(`error ${path}`);  //LOG error

      const endTime = Math.round(process.hrtime(start)[1]/1000000);
      timeout = timeout - endTime;

      if (timeout <= 0) {
        return null;
      }

      return await this.axiosRequest(path, process.hrtime(), timeout)
    }
  }
}

export default new Api()

