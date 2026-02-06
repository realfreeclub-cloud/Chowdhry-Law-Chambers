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
    name: { type: String, default: 'Justice League Partners' },
    theme: {
        primaryColor: { type: String, default: '#0f172a' },
        secondaryColor: { type: String, default: '#ea580c' },
        buttonColor: { type: String, default: '#ea580c' },
        textColor: { type: String, default: '#334155' },
        backgroundColor: { type: String, default: '#ffffff' },
        headingFont: { type: String, default: 'Inter' },
        bodyFont: { type: String, default: 'Inter' },
    },
    contact: {
        email: { type: String, default: 'info@firm.com' },
        phone: { type: String, default: '(555) 123-4567' },
        address: { type: String, default: '123 Law St, NY' },
        mapUrl: { type: String },
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
        text: { type: String, default: 'By accessing this site...' },
        acceptBtnText: { type: String, default: 'I Understand' },
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
                name: 'Sterling & Partners',
                theme: {
                    primaryColor: '#0f172a',
                    secondaryColor: '#ea580c',
                    buttonColor: '#ea580c',
                    textColor: '#334155',
                    backgroundColor: '#ffffff',
                    headingFont: 'Inter',
                    bodyFont: 'Inter',
                },
                contact: {
                    email: 'contact@sterling.com',
                    phone: '+1 (212) 555-0199',
                    address: '10 Hudson Yards, New York, NY 10001',
                    mapUrl: 'https://maps.google.com',
                },
                socialMedia: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    linkedin: 'https://linkedin.com',
                },
                logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Law_Scale_Icon.svg/1024px-Law_Scale_Icon.svg.png', // Placeholder logo
                menu: [
                    { label: 'Home', href: '/', order: 0 },
                    { label: 'Practice Areas', href: '/practice-areas', order: 1 },
                    { label: 'Team', href: '/team', order: 2 },
                    { label: 'Careers', href: '/careers', order: 3 },
                    { label: 'Contact', href: '/contact', order: 4 },
                ]
            });
            console.log('✅ Site config created');
        } else {
            console.log('⚠️  Site config already exists');
        }

        // --- Practice Areas ---
        const practiceAreas = [
            {
                title: 'Corporate Law',
                slug: 'corporate-law',
                shortDescription: 'Comprehensive legal solutions for businesses of all sizes.',
                fullDescription: '# Corporate Law\n\nWe provide expert guidance on mergers, acquisitions, and corporate governance.',
                imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80',
                icon: 'Briefcase',
                order: 1,
            },
            {
                title: 'Family Law',
                slug: 'family-law',
                shortDescription: 'Compassionate support for navigating family legal matters.',
                fullDescription: '# Family Law\n\nOur team is dedicated to helping families resolve disputes with care and understanding.',
                imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80',
                icon: 'Users',
                order: 2,
            },
            {
                title: 'Real Estate',
                slug: 'real-estate',
                shortDescription: 'Expert advice for commercial and residential property transactions.',
                fullDescription: '# Real Estate Law\n\nFrom closing deals to resolving disputes, we handle all aspects of real estate law.',
                imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
                icon: 'Home',
                order: 3,
            },
            {
                title: 'Criminal Defense',
                slug: 'criminal-defense',
                shortDescription: 'Aggressive representation for those facing criminal charges.',
                fullDescription: '# Criminal Defense\n\nWe protect your rights and freedom with zealous advocacy.',
                imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&q=80',
                icon: 'Shield',
                order: 4,
            },
            {
                title: 'Civil Law Services',
                slug: 'civil-law',
                shortDescription: 'Comprehensive civil law services protecting rights and resolving disputes.',
                fullDescription: `### Civil Law Services

Chowdhry Law Chambers provides comprehensive civil law services with a focus on protecting legal rights, resolving disputes efficiently, and delivering practical legal solutions.

Our civil law practice covers a wide range of matters, including property, contracts, and civil litigation. We represent clients before courts, tribunals, and authorities with thorough preparation and strategic advocacy.

---

### Our Civil Law Expertise Includes:

- **Property Disputes**  
  Legal assistance in ownership disputes, possession matters, partition suits, and title-related conflicts.

- **Contractual Matters**  
  Drafting, review, enforcement, and dispute resolution related to agreements and contracts.

- **Recovery Suits**  
  Representation in money recovery cases, dues, and financial claims through civil proceedings.

- **Injunctions and Declarations**  
  Legal remedies including temporary and permanent injunctions, declaratory reliefs, and court orders to protect rights.

---

### Our Approach

We focus on clear legal advice, strong documentation, and effective representation to ensure timely and favorable outcomes for our clients.`,
                imageUrl: 'https://images.unsplash.com/photo-1589216532380-a602c7acaed2?auto=format&fit=crop&q=80',
                icon: 'Scale',
                order: 5,
            }
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
            {
                fullName: 'Sarah Sterling',
                role: 'Managing Partner',
                bio: 'Sarah has over 20 years of experience in corporate law and litigation.',
                imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
                experience: '20+ Years',
                email: 'sarah@sterling.com',
                order: 1,
            },
            {
                fullName: 'James Chen',
                role: 'Senior Associate',
                bio: 'Specializing in intellectual property and technology law.',
                imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d6229b?auto=format&fit=crop&q=80',
                experience: '12 Years',
                email: 'james@sterling.com',
                order: 2,
            },
            {
                fullName: 'Elena Rodriguez',
                role: 'Family Law Specialist',
                bio: 'Dedicated to finding peaceful resolutions for complex family matters.',
                imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
                experience: '15 Years',
                email: 'elena@sterling.com',
                order: 3,
            },
            {
                fullName: 'Michael Ross',
                role: 'Litigation Attorney',
                bio: 'Aggressive litigator with a proven track record in high-stakes cases.',
                imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
                experience: '8 Years',
                email: 'michael@sterling.com',
                order: 4,
            }
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
            },
            {
                title: 'Protecting Your Interests',
                subtitle: 'Dedicated to securing the best possible outcome for you.',
                imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
                link: '/practice-areas',
                buttonText: 'Our Services',
                order: 2,
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

        // --- Jobs ---
        const jobs = [
            {
                title: 'Junior Associate Attorney',
                department: 'Litigation',
                location: 'New York, NY',
                type: 'Full-time',
                experience: '1-3 years',
                description: '# Junior Associate\n\nWe are looking for a motivated attorney to join our litigation team...',
                isActive: true,
                isPublished: true,
            },
            {
                title: 'Legal Paralegal',
                department: 'Real Estate',
                location: 'New York, NY',
                type: 'Full-time',
                experience: '3+ years',
                description: '# Legal Paralegal\n\nSupport our busy real estate practice with document preparation and client communication...',
                isActive: true,
                isPublished: true,
            }
        ];

        for (const job of jobs) {
            const exists = await Job.findOne({ title: job.title });
            if (!exists) {
                await Job.create(job);
                console.log(`✅ Job created: ${job.title}`);
            }
        }

        // --- Pages ---
        // Fetch practice areas for Services Grid
        const allPracticeAreas = await PracticeArea.find({ showOnHome: true }).sort('order');
        const serviceItems = allPracticeAreas.map(pa => ({
            title: pa.title,
            desc: pa.shortDescription,
            icon: pa.icon || 'Scale' // Default icon
        }));

        const existingHome = await Page.findOne({ slug: 'home' });
        if (existingHome) {
            await Page.deleteOne({ _id: existingHome._id });
            console.log('🔄 Removed existing duplicate/outdated home page');
        }

        await Page.create({
            title: 'Home',
            slug: 'home',
            isPublished: true,
            sections: [
                {
                    type: 'HERO_SLIDER',
                    order: 0,
                    content: {}
                },
                {
                    type: 'ABOUT',
                    order: 1,
                    content: {
                        subtitle: 'ABOUT US',
                        title: 'Chowdhry Law Chambers',
                        description: `Established in 1986, Chowdhry Law Chambers is a full-service litigation law firm based in Delhi, with a legacy spanning nearly four decades and three generations of legal practice. Since its inception, the Chambers has remained deeply rooted in courtroom advocacy while continuously evolving to meet the demands of modern litigation.

The firm operates through chambers at the Saket District Court and Tis Hazari District Court, along with offices at Badarpur, Delhi and Bengali Market, New Delhi, the latter serving as the firm’s principal office. From these bases, the Chambers handles litigation across India and selectively represents clients in matters involving international and cross-border elements.

Chowdhry Law Chambers maintains a robust litigation practice across Civil, Criminal, Commercial, and Constitutional domains. The firm regularly appears before the Supreme Court of India, the High Court of Delhi, various Delhi District Courts, and specialized tribunals including NGT, CAT, AFT, NCLT/NCLAT, and DRT/DRAT. Its practice also extends to the High Court of Madhya Pradesh, courts across Mumbai and Maharashtra, and trial courts and High Courts throughout India.`,
                        mainImage: 'https://images.unsplash.com/photo-1556157382-97eda2d6229b?auto=format&fit=crop&q=80',
                        groupImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
                        quote: 'Satyamev Jayate - Truth alone triumphs. We fight for the truth and your rights.',
                        phone: '+91 98765 43210'
                    }
                },
                {
                    type: 'SERVICES_GRID',
                    order: 2,
                    content: {
                        title: 'Our Practice Areas',
                        subtitle: 'Comprehensive legal solutions tailored to your needs.',
                        items: serviceItems
                    }
                },
                {
                    type: 'STATS',
                    order: 3,
                    content: {}
                },
                {
                    type: 'TESTIMONIALS',
                    order: 4,
                    content: {
                        items: [
                            {
                                text: "The team at Igual Law Firm went above and beyond for my family law case. Their professionalism and empathy made a difficult time much easier.",
                                author: "Maria Rodriguez",
                                role: "Client"
                            },
                            {
                                text: "Exceptional service for our corporate merger. Their attention to detail and strategic advice were invaluable.",
                                author: "David Chen",
                                role: "CEO, Tech Corp"
                            },
                            {
                                text: "I highly recommend them for any criminal defense matters. They are aggressive, knowledgeable, and result-oriented.",
                                author: "James Smith",
                                role: "Client"
                            }
                        ]
                    }
                }
            ]
        });
        console.log('✅ Home page created with dynamic content');

        console.log('\n🎉 Database seeding completed!');
        console.log('\n📝 Admin Login Credentials:');
        console.log('   URL: http://localhost:3000/admin/login');
        console.log('   Email: admin@lawfirm.com');
        console.log('   Password: admin123');
        console.log('\n⚠️  IMPORTANT: Change the password after first login!\n');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
