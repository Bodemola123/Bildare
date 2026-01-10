import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function uploadTemplates() {
  // Fetch categories
  const web3Category = await prisma.category.findUnique({ where: { name: "Web3" } });
  const blockchainCategory = await prisma.category.findUnique({ where: { name: "Blockchain" } });

  if (!web3Category || !blockchainCategory) {
    throw new Error("Required categories not found. Run uploadCategories first.");
  }

  /* ========== TEMPLATE 1 ========== */
  const nftTemplate = await prisma.template.create({
    data: {
      creator_id: 13, // replace with real user_id
      title: "NFT Marketplace Platform",
      description:
        "A modern NFT marketplace UI designed for seamless discovery, creation, and trading of digital assets. Includes marketplace browsing, collections management, NFT creation, auctions, exhibitions, and detailed account summaries, built for Web3-native experiences.",
      type: "web",
      price: new Prisma.Decimal(0),
      category_id: web3Category.category_id,
      stack: ["Figma"],
      status: "published",
      example_links: { figma_download: "https://drive.google.com/uc?export=download&id=1dUQokRsFmmoDzuXxL6zI3c4OmMwWvU-R" },
      media: {
        create: [
          { media_type: "cover", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768018150/NFTPLATFORM1_jiq0ox.png", order_index: 0 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015965/NFTPLATFORM2_d1cvtr.png", order_index: 1 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015965/NFTPLATFORM3_i8aggk.png", order_index: 2 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015966/NFTPLATFORM4_g551ba.png", order_index: 3 },
        ],
      },
      usecases: {
        create: [
          { title: "Marketplace & NFT discovery screens" },
          { title: "Create NFT & minting flow" },
          { title: "Collections & asset management pages" },
          { title: "Auction, exhibition & bidding interfaces" },
          { title: "User account summary & wallet overview" },
        ],
      },
    },
  });

  const nftTags = ["NFT", "Web3", "Marketplace", "Blockchain", "Crypto"];
  for (const tag of nftTags) {
    const tagRecord = await prisma.templateTag.upsert({ where: { name: tag }, update: {}, create: { name: tag } });
    await prisma.templateTagOnTemplate.create({ data: { template_id: nftTemplate.template_id, tag_id: tagRecord.tag_id } });
  }

  /* ========== TEMPLATE 2 ========== */
  const dexTemplate = await prisma.template.create({
    data: {
      creator_id: 13,
      title: "DEX (Decentralized Exchange) Platform",
      description:
        "A robust decentralized exchange UI designed for trading, liquidity management, and DeFi interactions. Includes pools, positions, vaults, and advanced trading flows tailored for experienced and emerging DeFi users.",
      type: "web",
      price: new Prisma.Decimal(0),
      category_id: blockchainCategory.category_id,
      stack: ["Figma"],
      status: "published",
      example_links: { figma_duplicate: "https://www.figma.com/file/OkwAnQhBP8OKJOVirnM6Qn/BILDARE-DEX?duplicate=1" },
      media: {
        create: [
          { media_type: "cover", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015965/DEX1_krmms3.png", order_index: 0 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015965/DEX2_ceimgo.png", order_index: 1 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015965/DEX3_e5gkcj.png", order_index: 2 },
          { media_type: "image", url: "https://res.cloudinary.com/dim0l22lo/image/upload/v1768015966/DEX4_kikako.png", order_index: 3 },
        ],
      },
      usecases: {
        create: [
          { title: "Token trading & swap interfaces" },
          { title: "Liquidity pools & vault overview pages" },
          { title: "Create, view & manage positions" },
          { title: "Portfolio & position tracking dashboards" },
          { title: "DeFi-focused data and analytics layouts" },
        ],
      },
    },
  });

  const dexTags = ["DeFi", "DEX", "Web3", "Crypto", "Blockchain"];
  for (const tag of dexTags) {
    const tagRecord = await prisma.templateTag.upsert({ where: { name: tag }, update: {}, create: { name: tag } });
    await prisma.templateTagOnTemplate.create({ data: { template_id: dexTemplate.template_id, tag_id: tagRecord.tag_id } });
  }

  console.log("✅ Templates uploaded successfully");
}

uploadTemplates().catch(console.error).finally(() => prisma.$disconnect());
