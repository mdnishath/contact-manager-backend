import app from './app';
import mongoose from 'mongoose';
import { DB_LOCAL_URL, PORT } from './app/config';
import { Server } from 'http';

let server: Server;
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(DB_LOCAL_URL as string, {
      retryWrites: true,
      w: 'majority',
    });
    server = app.listen(PORT, () => {
      console.log(`Course API listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

process.on('unhandledRejection', () => {
  console.log(`unahandledRejection is detected , shutting down `);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected , shutting down`);
  process.exit(1);
});
