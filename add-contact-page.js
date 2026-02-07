require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const PageSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    metaDesc: { type: String },
    isPublished: { type: Boolean, default: false },
    sections: [{ type: mongoose.Schema.Types.Mixed }],
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function run() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('connected');

        const contactPage = {
            title: 'Contact Us',
            slug: 'contact',
            isPublished: true,
            metaDesc: 'Get in touch with Chowdhry Law Chambers for expert legal guidance and representation.',
            sections: [
                {
                    type: 'MAP',
                    order: 0,
                    content: {}
                }
            ]
        };

        const existing = await Page.findOne({ slug: 'contact' });
        if (existing) {
            console.log('Contact page already exists in DB');
        } else {
            await Page.create(contactPage);
            console.log('Contact page added to DB');
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

run();
