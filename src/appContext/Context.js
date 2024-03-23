import {createContext, useEffect, useState} from 'react';
import axios from 'axios';
export const AppContext = createContext();
export const IMG_BG = require('../assets/img/bgsingly.jpg');

const SinglyProvider = ({children}) => {
  const init = {
    name: '',
    email: '',
    password: '',
    dateofbirth: '',
    gender: '',
    passion: '',
    ideal: '',
    photo: '',
    location: '',
  };
  const [data, setData] = useState(init);

  useEffect(() => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  }, [data]);
  
  const SubmitHandler = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://synglys.arvtec.com/api/registration',
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        host: 'synglys.arvtec.com',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'sec-ch-ua':
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        dnt: '1',
        'upgrade-insecure-requests': '1',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify('response.data', response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  // ashutosh bhen ka lauvda hai mc hai syd ...
  // kya ashutosh chutiya hai

  return (
    <AppContext.Provider value={{data, setData, IMG_BG, SubmitHandler}}>
      {children}
    </AppContext.Provider>
  );
};

export default SinglyProvider;
