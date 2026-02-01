require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

const PageSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    sections: [{ type: mongoose.Schema.Types.Mixed }],
}, { strict: false });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function verify() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const home = await Page.findOne({ slug: 'home' });
        if (!home) {
            console.log('❌ Home page NOT found');
        } else {
            console.log('✅ Home page found');
            console.log('Sections present:', home.sections.map(s => s.type));
            console.log('Total sections:', home.sections.length);
        }
        await mongoose.disconnect();
    } catch (e) {
        console.error(e);
    }
}

verify();
