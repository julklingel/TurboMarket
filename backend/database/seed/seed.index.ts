import {seedSupplier} from './seed.supplier';
import {seedUsers} from './seed.user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const seed = async () => {
    seedSupplier()
    seedUsers()
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })