require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing in .env');
    process.exit(1);
}

const PageSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    metaDesc: { type: String },
    isPublished: { type: Boolean, default: false },
    sections: [{ type: mongoose.Schema.Types.Mixed }],
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function seedContact() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const contactData = {
            title: 'Contact Us',
            slug: 'contact',
            isPublished: true,
            metaDesc: 'Get in touch with Chowdhry Law Chambers for expert legal guidance and representation.',
            sections: [
                {
                    type: 'CONTACT_DETAILED',
                    order: 0,
                    content: {
                        heroTitle: 'Contact Our Experts',
                        heroSubtitle: 'With over 40 years of legal excellence, Chowdhry Law Chambers provides strategic counsel across Delhi and nationwide. Connect with us to discuss your legal requirements.',
                        sectionSubtitle: 'Connect With Us',
                        sectionTitle: 'Professional Legal Support At Your Disposal',
                        sectionDescription: 'Our firm operates through multiple strategic locations across Delhi to ensure accessibility and prompt legal action. Whether you require a consultation at our principal office or need assistance at the District Courts, we are ready to serve.',
                        locations: [
                            { name: "Principal Office", address: "Bengali Market, New Delhi - 110001" },
                            { name: "South Delhi Chambers", address: "Chambers No. 222, Western Wing, Saket District Court, New Delhi" },
                            { name: "Central Delhi Chambers", address: "Tis Hazari District Court, Delhi - 110054" },
                            { name: "Regional Branch", address: "Badarpur, New Delhi - 110044" }
                        ],
                        faqs: [
                            {
                                question: "How soon can I expect a response?",
                                answer: "We typically review all inquiries and respond within 24 hours on business days to schedule an initial discussion."
                            },
                            {
                                question: "Do you provide pan-India services?",
                                answer: "Yes, while we are primarily based in Delhi, our firm represents clients in various High Courts and specialized tribunals across India."
                            },
                            {
                                question: "Is my information confidential?",
                                answer: "Absolutely. Attorney-client privilege applies from your very first communication with us, ensuring your information is completely protected."
                            },
                            {
                                question: "What documents should I prepare?",
                                answer: "For our initial call, just a brief summary is enough. If we schedule a meeting, we will provide a list of relevant legal documents needed for your specific case."
                            }
                        ]
                    }
                }
            ]
        };

        await Page.findOneAndUpdate(
            { slug: 'contact' },
            contactData,
            { upsert: true, new: true }
        );

        console.log('✅ Contact page seeded/updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding contact page:', error);
        process.exit(1);
    }
}

seedContact();
