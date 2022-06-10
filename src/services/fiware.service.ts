import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataInOrion = async (entity: any) => {
  const URL = process.env.URL_LOCAL
    ? process.env.URL_LOCAL
    : 'http://localhost/';
  const PORT = process.env.PORT_ORION ? process.env.PORT_ORION : '1026';

  const config = {
    method: 'post',
    url: URL + ':' + PORT + '/v2/entities',
    headers: {
      'Content-Type': 'application/json',
    },
    data: entity,
  };

  return axios(config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDataInOrion = async (id: string, changes: any) => {
  const URL = process.env.URL_LOCAL
    ? process.env.URL_LOCAL
    : 'http://localhost/';
  const PORT = process.env.PORT_ORION ? process.env.PORT_ORION : '1026';

  const config = {
    method: 'patch',
    url: URL + ':' + PORT + '/v2/entities/' + id + '?type=room',
    headers: {
      'Content-Type': 'application/json',
      //'Content-Length': 31,
    },
    body: changes,
  };

  return axios(config);
};
