require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

const SiteConfigSchema = new mongoose.Schema({
    menu: [{ label: String, href: String, order: Number }],
    logoUrl: String
}, { strict: false });

const SiteConfig = mongoose.models.SiteConfig || mongoose.model('SiteConfig', SiteConfigSchema);

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const config = await SiteConfig.findOne();
        if (config) {
            config.contact = {
                email: 'info@lawfirm.in',
                phone: '+91 98765 43210',
                address: 'Connaught Place, New Delhi, India',
                mapUrl: ''
            };
            config.logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Law_Scale_Icon.svg/1024px-Law_Scale_Icon.svg.png';
            config.menu = [
                { label: 'Home', href: '/', order: 0 },
                { label: 'Practice Areas', href: '/practice-areas', order: 1 },
                { label: 'Team', href: '/team', order: 2 },
                { label: 'Careers', href: '/careers', order: 3 },
                { label: 'Contact', href: '/contact', order: 4 },
            ];
            await config.save();
            console.log('✅ SiteConfig updated with Menu and Logo');
        } else {
            console.log('❌ SiteConfig not found');
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

migrate();
