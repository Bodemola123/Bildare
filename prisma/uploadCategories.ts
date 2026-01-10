import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadCategories() {
  const categories = [
    { name: "Blockchain", slug: "blockchain", description: "Blockchain and decentralized application templates" },
    { name: "Web3", slug: "web3", description: "Web3 platforms, NFT, crypto, and decentralized systems" },
    { name: "Artificial Intelligence", slug: "artificial-intelligence", description: "AI-powered products, tools, and interfaces" },
    { name: "E commerce", slug: "e-commerce", description: "Online stores, marketplaces, and checkout experiences" },
    { name: "SAAS", slug: "saas", description: "Software as a Service dashboards and platforms" },
    { name: "Dashboards", slug: "dashboards", description: "Analytics, admin, and data dashboards" },
    { name: "Meme", slug: "meme", description: "Meme-based, fun, or experimental products" },
    { name: "Bots", slug: "bots", description: "Bot interfaces, automations, and agents" },
    { name: "Landing page", slug: "landing-page", description: "Marketing and product landing pages" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories uploaded successfully");
}

uploadCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
