require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

const PracticeAreaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    icon: { type: String },
    imageUrl: { type: String },
    showOnHome: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
});

const PracticeArea = mongoose.models.PracticeArea || mongoose.model('PracticeArea', PracticeAreaSchema);

const newPracticeAreas = [
    { title: 'Civil Litigation', icon: 'Scale' },
    { title: 'Criminal Litigation', icon: 'Gavel' },
    { title: 'Matrimonial & Family Law', icon: 'Users' },
    { title: 'Property & Land Disputes', icon: 'Home' },
    { title: 'Corporate & Commercial Litigation', icon: 'Briefcase' },
    { title: 'Arbitration & Mediation', icon: 'Handshake' },
    { title: 'Company Law (NCLT / NCLAT)', icon: 'Building' },
    { title: 'Debt Recovery & Financial Litigation', icon: 'Landmark' }, // (DRT / DRAT)
    { title: 'Constitutional & Writ Jurisdiction', icon: 'BookOpen' },
    { title: 'Intellectual Property Rights (IPR)', icon: 'Cpu' },
    { title: 'Insolvency & Restructuring', icon: 'TrendingDown' },
    { title: 'Contractual & Commercial Disputes', icon: 'FileText' },
    { title: 'Regulatory & Tribunal Litigation', icon: 'Shield' }
];

async function updatePracticeAreas() {
    try {
        console.log('🔄 Connecting to database...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('🗑️ Clearing existing practice areas...');
        await PracticeArea.deleteMany({});

        console.log('🌱 Seeding new practice areas...');
        for (let i = 0; i < newPracticeAreas.length; i++) {
            const area = newPracticeAreas[i];
            await PracticeArea.create({
                title: area.title,
                slug: area.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                shortDescription: `Expert legal representation in ${area.title}.`,
                fullDescription: `# ${area.title}\n\nWe provide comprehensive legal services in ${area.title}.`,
                icon: area.icon,
                order: i + 1,
                showOnHome: i < 6 // Show first 6 on home
            });
            console.log(`✅ Created: ${area.title}`);
        }

        console.log('✨ Practice Areas updated successfully!');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error updating database:', error);
        process.exit(1);
    }
}

updatePracticeAreas();
