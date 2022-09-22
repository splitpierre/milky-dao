import { PrismaClient } from '@prisma/client';

export async function customSeed() {
  const client = new PrismaClient();
  const address = 'admin';

  //replace this sample code to populate your database
  //with data that is required for your service to start
  await client.user.update({
    where: { address: address },
    data: {
      address,
    },
  });

  client.$disconnect();
}
