require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

// Define schemas inline (simplified for seeding)
const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
});

const SiteConfigSchema = new mongoose.Schema({
    name: { type: String, default: 'Chowdhry Law Chambers' },
    theme: {
        mode: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
        preset: { type: String, enum: ['default', 'classic', 'corporate'], default: 'corporate' },
        primaryColor: { type: String, default: '#0f172a' },
        secondaryColor: { type: String, default: '#d4af37' },
        buttonColor: { type: String, default: '#d4af37' },
        textColor: { type: String, default: '#334155' },
        backgroundColor: { type: String, default: '#ffffff' },
        headingFont: { type: String, default: 'Playfair Display' },
        bodyFont: { type: String, default: 'Manrope' },
        borderRadius: { type: String, default: '0.5rem' },
    },
    contact: {
        email: { type: String, default: 'office@chowdhrylaw.com' },
        phone: { type: String, default: '+91 98111 25450' },
        address: { type: String, default: 'Bengali Market, New Delhi - 110001' },
        showMapOnHome: { type: Boolean, default: false },
        mapUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3501.956740685934!2d77.22891961508264!3d28.63095398241771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3420000001%3A0x6a3f4e2f9f1f0f0f!2sBengali%20Market!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin' },
    },
    socialMedia: {
        facebook: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    },
    disclaimer: {
        enabled: { type: Boolean, default: true },
        title: { type: String, default: 'Legal Disclaimer' },
        text: { type: String, default: 'By accessing this site, you agree that no attorney-client relationship is formed...' },
        acceptBtnText: { type: String, default: 'I Agree' },
    },
    logoUrl: { type: String },
});

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

const TeamMemberSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    imageUrl: { type: String },
    experience: { type: String },
    email: { type: String },
    linkedinUrl: { type: String },
    order: { type: Number, default: 0 },
});

const SliderSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    imageUrl: { type: String, required: true },
    link: { type: String },
    buttonText: { type: String, default: 'Learn More' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
});

const PageSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    metaDesc: { type: String },
    isPublished: { type: Boolean, default: false },
    sections: [{ type: mongoose.Schema.Types.Mixed }],
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String, default: 'New York, NY' },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    experience: { type: String },
    description: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: false },
    postedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const SiteConfig = mongoose.models.SiteConfig || mongoose.model('SiteConfig', SiteConfigSchema);
const PracticeArea = mongoose.models.PracticeArea || mongoose.model('PracticeArea', PracticeAreaSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
const Slider = mongoose.models.Slider || mongoose.model('Slider', SliderSchema);
const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

async function seed() {
    try {
        console.log('🌱 Seeding database...');

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // --- Admin ---
        const adminEmail = 'admin@lawfirm.com';
        const adminPassword = 'admin123';
        const existingAdmin = await Admin.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await Admin.create({ email: adminEmail, passwordHash: hashedPassword });
            console.log('✅ Admin user created');
        } else {
            console.log('⚠️  Admin user already exists');
        }

        // --- Site Config ---
        const existingConfig = await SiteConfig.findOne();
        if (!existingConfig) {
            await SiteConfig.create({
                name: 'Chowdhry Law Chambers',
                theme: {
                    primaryColor: '#0f172a',
                    secondaryColor: '#d4af37',
                    buttonColor: '#d4af37',
                    textColor: '#334155',
                    backgroundColor: '#ffffff',
                    headingFont: 'Playfair Display',
                    bodyFont: 'Manrope',
                },
                contact: {
                    email: 'office@chowdhrylaw.com',
                    phone: '+91 98111 25450',
                    address: 'Bengali Market, New Delhi - 110001',
                    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3501.956740685934!2d77.22891961508264!3d28.63095398241771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3420000001%3A0x6a3f4e2f9f1f0f0f!2sBengali%20Market!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin',
                },
                socialMedia: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com',
                },
                logoUrl: '',
                menu: [
                    { label: 'Home', href: '/', order: 0 },
                    { label: 'Practice Areas', href: '/practice-areas', order: 1 },
                    { label: 'Team', href: '/team', order: 2 },
                    { label: 'Careers', href: '/careers', order: 3 },
                    { label: 'Contact', href: '/contact', order: 4 },
                ]
            });
            console.log('✅ Site config created');
        }

        // --- Practice Areas ---
        // (Maintaining previous list)
        const practiceAreas = [
            { title: 'Civil Litigation', slug: 'civil-litigation', icon: 'Scale', order: 1 },
            { title: 'Criminal Litigation', slug: 'criminal-litigation', icon: 'Gavel', order: 2 },
            { title: 'Matrimonial & Family Law', slug: 'matrimonial-family-law', icon: 'Users', order: 3 },
            { title: 'Property & Land Disputes', slug: 'property-land-disputes', icon: 'Home', order: 4 },
            { title: 'Corporate & Commercial Litigation', slug: 'corporate-commercial-litigation', icon: 'Briefcase', order: 5 },
            { title: 'Arbitration & Mediation', slug: 'arbitration-mediation', icon: 'Handshake', order: 6 },
            { title: 'Company Law (NCLT / NCLAT)', slug: 'company-law-nclt-nclat', icon: 'Building', order: 7 },
            { title: 'Debt Recovery & Financial Litigation', slug: 'debt-recovery-financial-litigation', icon: 'Landmark', order: 8 },
            { title: 'Constitutional & Writ Jurisdiction', slug: 'constitutional-writ-jurisdiction', icon: 'BookOpen', order: 9 },
            { title: 'Intellectual Property Rights (IPR)', slug: 'intellectual-property-rights-ipr', icon: 'Cpu', order: 10 },
            { title: 'Insolvency & Restructuring', slug: 'insolvency-restructuring', icon: 'TrendingDown', order: 11 },
            { title: 'Contractual & Commercial Disputes', slug: 'contractual-commercial-disputes', icon: 'FileText', order: 12 },
            { title: 'Regulatory & Tribunal Litigation', slug: 'regulatory-tribunal-litigation', icon: 'Shield', order: 13 }
        ];

        for (const area of practiceAreas) {
            const exists = await PracticeArea.findOne({ slug: area.slug });
            if (!exists) {
                await PracticeArea.create(area);
                console.log(`✅ Practice Area created: ${area.title}`);
            }
        }

        // --- Team Members ---
        const teamMembers = [
            { fullName: 'Sarvesh Chowdhry', role: 'Advocate | Founder Member | Managing Partner', email: 'sarvesh@chowdhrylaw.com', order: 1 },
            { fullName: 'R. K. Pandey', role: 'Advocate | Senior Partner', email: 'rk@chowdhrylaw.com', order: 2 },
            { fullName: 'Varun Verma', role: 'Advocate | Partner', email: 'varun@chowdhrylaw.com', order: 3 },
            { fullName: 'Pushaan Singh Gullia', role: 'Advocate | Partner', email: 'pushaan@chowdhrylaw.com', order: 4 },
            { fullName: 'Jyoti Das', role: 'Advocate | Partner', email: 'jyoti@chowdhrylaw.com', order: 5 },
            { fullName: 'Mohd. Anwar Aman', role: 'Advocate | Partner', email: 'anwar@chowdhrylaw.com', order: 6 },
            { fullName: 'Kshitij Singh', role: 'Advocate | Partner', email: 'kshitij@chowdhrylaw.com', order: 7 }
        ];

        for (const member of teamMembers) {
            const exists = await TeamMember.findOne({ email: member.email });
            if (!exists) {
                await TeamMember.create(member);
                console.log(`✅ Team Member created: ${member.fullName}`);
            }
        }

        // --- Sliders ---
        const sliders = [
            {
                title: 'Excellence in Legal Practice',
                subtitle: 'Providing top-tier legal representation for decades.',
                imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80',
                link: '/contact',
                buttonText: 'Free Consultation',
                order: 1,
                isActive: true,
            }
        ];

        for (const slider of sliders) {
            const exists = await Slider.findOne({ title: slider.title });
            if (!exists) {
                await Slider.create(slider);
                console.log(`✅ Slider created: ${slider.title}`);
            }
        }

        // --- Home Page ---
        const existingHome = await Page.findOne({ slug: 'home' });
        if (existingHome) {
            await Page.deleteOne({ _id: existingHome._id });
        }

        await Page.create({
            title: 'Home',
            slug: 'home',
            isPublished: true,
            sections: [
                { type: 'HERO_SLIDER', order: 0, content: {} },
                {
                    type: 'ABOUT',
                    order: 1,
                    content: {
                        subtitle: 'ABOUT US',
                        title: 'Chowdhry Law Chambers',
                        description: `Established in 1986...`,
                        phone: '+91 98111 25450'
                    }
                },
                {
                    type: 'SERVICES_GRID',
                    order: 2,
                    content: {
                        title: 'Our Practice Areas',
                        subtitle: 'Comprehensive legal solutions',
                        items: practiceAreas.map(pa => ({ title: pa.title, desc: pa.shortDescription || pa.title, icon: pa.icon }))
                    }
                }
            ]
        });
        console.log('✅ Home page created');

        // --- Contact Page ---
        const existingContact = await Page.findOne({ slug: 'contact' });
        if (existingContact) {
            await Page.deleteOne({ _id: existingContact._id });
        }

        await Page.create({
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
                        heroSubtitle: 'With over 40 years of legal excellence, Chowdhry Law Chambers provides strategic counsel across Delhi and nationwide.',
                        sectionSubtitle: 'Connect With Us',
                        sectionTitle: 'Professional Legal Support At Your Disposal',
                        sectionDescription: 'Our firm operates through multiple strategic locations across Delhi to ensure accessibility and prompt legal action.',
                        locations: [
                            { name: "Principal Office", address: "Bengali Market, New Delhi - 110001" },
                            { name: "South Delhi Chambers", address: "Chambers No. 222, Western Wing, Saket District Court, New Delhi" },
                            { name: "Central Delhi Chambers", address: "Tis Hazari District Court, Delhi - 110054" },
                            { name: "Regional Branch", address: "Badarpur, New Delhi - 110044" }
                        ],
                        faqs: [
                            { question: "How soon can I expect a response?", answer: "We review inquiries within 24 hours." },
                            { question: "Do you provide pan-India services?", answer: "Yes, we represent clients across India." }
                        ]
                    }
                }
            ]
        });
        console.log('✅ Contact page created');

        console.log('\n🎉 Database seeding completed!');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
