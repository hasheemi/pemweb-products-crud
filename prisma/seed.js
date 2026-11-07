const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
    { name: 'Buku', price: 15000 },
    { name: 'Pulpen', price: 5000 },
    { name: 'Penghapus', price: 3000 },
    { name: 'Penggaris', price: 7000 },
    { name: 'Tas', price: 85000 },
];

async function main() {
    // Reset table
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "products" RESTART IDENTITY CASCADE');
    await prisma.product.createMany({ data: products });

    const seeded = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    console.table(seeded);
    console.log(`Seeded ${seeded.length} products.`);
}

main()
    .catch(error => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
