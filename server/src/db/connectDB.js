import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Missing MONGODB_URI in environment variables.');
    }

    mongoose.set('strictQuery', true); // Prevent queries on undefined fields

    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unreachable
      socketTimeoutMS: 45000, // Close idle sockets
      maxPoolSize: 10, // Limit connection pool size
    });

    console.log(
      `🟢 MongoDB connected successfully → Database: "${connectionInstance.connection.name}" @ Host: "${connectionInstance.connection.host}"`
    );
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    process.exit(1); // Prevent app from running in an unstable state
  }
};

// MongoDB connection event listeners for better debugging
mongoose.connection.on('disconnected', () =>
  console.warn('⚠️ MongoDB disconnected.')
);
mongoose.connection.on('reconnected', () =>
  console.log('🔄 MongoDB reconnected.')
);
mongoose.connection.on('error', (err) =>
  console.error('❌ MongoDB connection error:', err)
);

// Gracefully close MongoDB connection on process termination (e.g., Ctrl + C)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔴 MongoDB disconnected due to app termination.');
  process.exit(0);
});

export default connectDB;
