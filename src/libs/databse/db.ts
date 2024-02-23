// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// let prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
//   process.on("SIGINT", () => prismaclose());
//   process.on("exit", () => prismaclose());
// } else {
//   globalForPrisma.prisma = prisma;
// }
// async function prismaclose() {
//   if (globalForPrisma.prisma) {
//     await globalForPrisma.prisma.$disconnect();
//     delete globalForPrisma.prisma;
//   }
// }

// export const db = prisma;
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
