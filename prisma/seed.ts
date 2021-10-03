import { Prisma, PrismaClient } from '@prisma/client';

console.log('Top of script');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
  console.log('Start seeding...');

  const userData: Prisma.UserCreateInput[] = [
    {
      username: 'user123',
      name: 'user123',
      password: '12345678',
    },
    {
      username: 'userTest',
      name: 'userTest',
      password: '12345678',
    },
  ];

  await prisma.user.createMany({ data: userData });

  console.log('Finished seeding.');
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

console.log('Bottom of script');
