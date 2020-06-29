import { createConnection } from 'typeorm';

export default () => {
  createConnection()
    .then(() => {
      console.log('DB Connected');
    })
    .catch((err) => {
      console.log(`Error connect DB: ${err}`);
    });
};
