require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

const PageSchema = new mongoose.Schema({
    slug: String,
    sections: [mongoose.Schema.Types.Mixed]
}, { strict: false });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function updateHome() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const homePage = await Page.findOne({ slug: 'home' });
        if (homePage) {
            // Find ABOUT section
            const aboutSectionIndex = homePage.sections.findIndex(s => s.type === 'ABOUT');
            if (aboutSectionIndex !== -1) {
                homePage.sections[aboutSectionIndex].content = {
                    subtitle: 'ABOUT US',
                    title: 'Premium Legal Services in India',
                    description: 'We are a premier law firm based in New Delhi, dedicated to providing top-tier legal representation across the Supreme Court and High Courts of India.',
                    mainImage: 'https://images.unsplash.com/photo-1556157382-97eda2d6229b?auto=format&fit=crop&q=80',
                    groupImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
                    quote: 'Satyamev Jayate - Truth alone triumphs. We fight for the truth and your rights.',
                    phone: '+91 98765 43210'
                };

                // Mark as modified since we changed a mixed array
                homePage.markModified('sections');
                await homePage.save();
                console.log('✅ Homepage updated with Indian context');
            } else {
                console.log('❌ About section not found in Home');
            }
        } else {
            console.log('❌ Home page not found');
        }

        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

updateHome();
