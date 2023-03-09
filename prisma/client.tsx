import { PrismaClient } from '@prisma/client';

declare global {
	namespace NodeJS {
		interface Global {}
	}
}

// prisma add to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
	prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

// const client = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

if (process.env.NODE_ENV === 'development') global.prisma = prisma;
export default prisma;
