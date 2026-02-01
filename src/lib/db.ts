import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Only enforce MONGODB_URI at runtime, not during build
// This prevents build failures when env vars aren't available
if (!MONGODB_URI && typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('Warning: MONGODB_URI not defined. Database operations will fail.');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Fix for global variable type
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // Runtime check for MONGODB_URI
    if (!MONGODB_URI) {
        throw new Error(
            'MONGODB_URI is not defined. Please add it to your environment variables.'
        );
    }

    if (!cached) {
        cached = global.mongoose = { conn: null, promise: null };
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
