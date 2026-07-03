import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: { password: hashedPassword },
    create: { username: 'admin', password: hashedPassword },
  });

  // Create default categories
  const cat = await prisma.category.create({
    data: {
      name: 'Aventure & Nature',
      description: 'Des séjours en pleine nature pour se reconnecter à l\'essentiel.'
    }
  });

  // Create programs (camps)
  const programs = [
    { title: "Explorateurs des Alpes", duration: "7-12 ans (14 jours)", image: "https://images.unsplash.com/photo-1526725227289-4977457788da?auto=format&fit=crop&q=80", isFeatured: true, order: 1, desc: "Randonnées, feux de camp et découverte de la faune alpine.", price: 850 },
    { title: "Aventure Nautique", duration: "13-17 ans (10 jours)", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80", isFeatured: true, order: 2, desc: "Voile, kayak et surf sur la côte atlantique.", price: 920 },
    { title: "Camp Survie & Forêt", duration: "10-15 ans (7 jours)", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80", isFeatured: true, order: 3, desc: "Apprendre à s'orienter, construire des cabanes et vivre en autonomie.", price: 650 },
  ];

  for (const p of programs) {
    await prisma.program.create({
      data: {
        title: p.title,
        duration: p.duration,
        image: p.image,
        isFeatured: p.isFeatured,
        order: p.order,
        description: p.desc,
        price: p.price,
        categoryId: cat.id
      }
    });
  }

  console.log("Database seeded for Summer Camp!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
