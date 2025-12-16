import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);
  // seeds users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@admin.com',
        password: passwordHash,
        name: 'Admin',
      }
    ],
    skipDuplicates: true,
  });
}

main() 
  .then(async () => {
    console.log('Database has been seeded. 🌱');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
