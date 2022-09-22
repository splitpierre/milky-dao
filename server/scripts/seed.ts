import { PrismaClient } from '@prisma/client';

if (require.main === module) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info('Seeding database...');

  const client = new PrismaClient();
  const adminUser = {
    name: 'admin1',
    address: 'addrtest1',
    rolesEnum: ['admin'],
  };
  const categories: any = [
    {
      title: 'Games',
      slug: 'games',
    },
    {
      title: 'Protocol',
      slug: 'protocol',
    },
    {
      title: 'DeFi',
      slug: 'defi',
    },
  ];
  await client.user.upsert({
    where: { address: adminUser.address },
    update: {},
    create: adminUser,
  });

  for (const category of categories) {
    await client.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  void client.$disconnect();

  // console.info('Seeding database with custom seed...');
  // customSeed();

  console.info('Seeded database successfully');
}
