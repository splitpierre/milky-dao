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

  /**
   * User Roles
   */
  const userRoles: any = [
    {
      name: 'Admin',
    },
    {
      name: 'Voter',
    },
    {
      name: 'Developer',
    },
    {
      name: 'Project Manager',
    },
  ];
  const genUserRoles: any = [];
  for (const userRole of userRoles) {
    const inserted = await client.userRole.upsert({
      where: { name: userRole.name },
      update: {},
      create: userRole,
    });
    genUserRoles.push(inserted);
  }
  console.log('gen roles', { genUserRoles });
  /**
   * Master Admin
   */
  const adminUser = {
    name: 'admin1',
    address: 'addrtest1',
    roles: {
      connect: [
        {
          id: genUserRoles[
            genUserRoles.findIndex((obj) => obj.name === 'Admin')
          ].id,
        },
      ],
    },
  };

  const adminInserted = await client.user.upsert({
    where: { address: adminUser.address },
    update: {},
    create: adminUser,
  });

  /**
   * Categories
   */
  const categories: any = [
    {
      title: 'Game',
      slug: 'game',
    },
    {
      title: 'Protocol',
      slug: 'protocol',
    },
    {
      title: 'DeFi',
      slug: 'defi',
    },
    {
      title: 'Wallet',
      slug: 'wallet',
    },
    {
      title: 'Tools',
      slug: 'tools',
    },
  ];
  const generatedCategories: any = [];
  for (const category of categories) {
    const inserted = await client.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    generatedCategories.push(inserted);
  }
  /**
   * Projects
   */
  const projects: any = [
    {
      title: 'Eternl',
      slug: 'eternl',
      shortDescription: 'A Cardano light wallet for the Cardano community.',
      fullDescription:
        'Eternl is a fully functional Cardano light wallet for the browser. It will be the basis for all additional features, that the Cardano community wants for a modern web wallet.\n' +
        "By implementing features requested by the community, we will strive to be the innovative light wallet for power users and newcomers alike. Build by community members for the whole Cardano community. We've already implemented many features that are missing in today's wallets: NFT display, better token processing, address book etc.",
      iconImage:
        'https://uploads-ssl.webflow.com/60d83e3c6cf84748f7d0a62b/623d54126a85fa41bc71d574_Eternl.png',
      categories: {
        connect: [
          {
            id: generatedCategories[
              generatedCategories.findIndex((obj) => obj.slug === 'wallet')
            ].id,
          },
        ],
      },
      userId: adminInserted.id,
    },
    {
      title: 'Milkomeda (dcSpark)',
      slug: 'milkomeda',
      shortDescription:
        'Expands and connects blockchain ecosystems, helping them communicate with each other in a more efficient and intuitive way.',
      fullDescription:
        "Following Metcalfe's law, tech products primarily accrue value based on the size of their network. This means that superior technology can give a slight edge but does not in itself guarantee a definitive win against established competitors. Promising cryptocurrency projects are part of this set of tech products, thus it is necessary to achieve a critical adoption growth trajectory to actually come out ahead over the long term.\n",
      iconImage:
        'https://uploads-ssl.webflow.com/60d83e3c6cf84748f7d0a62b/615c6e323621c20e43b94706_dcSpark.png',
      categories: {
        connect: [
          {
            id: generatedCategories[
              generatedCategories.findIndex((obj) => obj.slug === 'protocol')
            ].id,
          },
        ],
      },
      userId: adminInserted.id,
    },
    {
      title: 'Lil Goats',
      slug: 'lil-goats',
      shortDescription:
        'Li’l Goats is a multiplayer battle royale game on the #Cardano blockchain! ',
      fullDescription:
        'Li’l Goats is a Battle Royale game where goats fight for survival in a 2D environment with a top-down view. Players can win tokens from battles, own arenas, and goats and contribute to the Li’l Goats universe and social and environmental causes.\n',
      iconImage:
        'https://uploads-ssl.webflow.com/60d83e3c6cf84748f7d0a62b/61d31feb7494374f8cf4a130_Lil%20Goats.png',
      categories: {
        connect: [
          {
            id: generatedCategories[
              generatedCategories.findIndex((obj) => obj.slug === 'game')
            ].id,
          },
          {
            id: generatedCategories[
              generatedCategories.findIndex((obj) => obj.slug === 'defi')
            ].id,
          },
        ],
      },
      userId: adminInserted.id || 1,
    },
    {
      title: 'Blockfrost',
      slug: 'blockfrost',
      shortDescription:
        'We provide an instant and scalable Cardano API for free. ',
      fullDescription:
        'API for Cardano decentralized blockchain. Accessing and processing information stored on the blockchain is not trivial. We provide abstraction between you and blockchain data, taking away the burden of complexity, so you can focus on what really matters - developing your applications.\n',
      iconImage:
        'https://uploads-ssl.webflow.com/60d83e3c6cf84748f7d0a62b/613f20ede726f6e240554584_blockfrost.png',
      categories: {
        connect: [
          {
            id: generatedCategories[
              generatedCategories.findIndex((obj) => obj.slug === 'tools')
            ].id,
          },
        ],
      },
      userId: adminInserted.id,
    },
  ];
  for (const project of projects) {
    await client.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  void client.$disconnect();

  // console.info('Seeding database with custom seed...');
  // customSeed();

  console.info('Seeded database successfully');
}
