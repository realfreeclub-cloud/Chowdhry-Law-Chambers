import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { SiteConfig, Page, Admin, PracticeArea, TeamMember, Slider } from '../src/models';

// Hardcode URI to bypass dotenv issues temporarily
const MONGODB_URI = "mongodb://localhost:27017/lawfirm";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

const seed = async () => {
    try {
        console.log('Connecting to DB...');
        await connectDB();
        console.log('Connected.');

        // 1. Clear existing data
        await SiteConfig.deleteMany({});
        await PracticeArea.deleteMany({});
        await TeamMember.deleteMany({});
        await Slider.deleteMany({});
        await Admin.deleteMany({});
        // Keep Pages if strictly needed, but wiping for clean slate
        await Page.deleteMany({});

        // 2. Seed Site Config
        console.log('Creating Site Config...');
        await SiteConfig.create({});

        // 3. Seed Admin
        console.log('Creating Admin...');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('admin123', salt);
        await Admin.create({
            email: 'admin@law.com',
            passwordHash: hash
        });

        // 4. Seed Practice Areas
        console.log('Creating Practice Areas...');
        await PracticeArea.create([
            {
                title: 'Corporate Law',
                slug: 'corporate-law',
                shortDescription: 'Comprehensive legal solutions for businesses.',
                fullDescription: 'Full description of corporate law services...',
                icon: 'Briefcase',
                order: 1
            },
            {
                title: 'Family Law',
                slug: 'family-law',
                shortDescription: 'Compassionate support for family matters.',
                fullDescription: 'Full description of family law services...',
                icon: 'Users',
                order: 2
            },
        ]);

        // 5. Seed Team
        console.log('Creating Team...');
        await TeamMember.create([
            {
                fullName: 'Harvey Specter',
                role: 'Senior Partner',
                bio: 'The best closer in the city.',
                order: 1
            },
            {
                fullName: 'Jessica Pearson',
                role: 'Managing Partner',
                bio: 'Leadership and vision.',
                order: 2
            }
        ]);

        // 6. Seed Slider
        console.log('Creating Sliders...');
        await Slider.create([
            {
                title: 'We Fight For You',
                subtitle: 'Top-rated legal defense in NYC.',
                imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb930b5?auto=format&fit=crop&q=80',
                order: 1
            }
        ]);

        console.log('Seeding Complete.');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
