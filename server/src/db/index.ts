import { connection, connect } from 'mongoose';

export default (db: string): void => {
  const connectDb = (): void => {
    connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connect to DB!!'))
      .catch(() => {
        console.log('Erro to connect');
        return process.exit(1);
      });
  };
  connectDb();

  connection.on('disconnected', connectDb);
};
