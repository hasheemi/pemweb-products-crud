const { PrismaClient } = require('@prisma/client');

// Single PrismaClient instance shared across the app.
const prisma = new PrismaClient();

module.exports = prisma;
