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
                title: 'Civil Litigation',
                slug: 'civil-litigation',
                shortDescription: 'Expert legal representation in Civil Litigation.',
                fullDescription: '# Civil Litigation\n\nWe provide comprehensive legal services in Civil Litigation.',
                icon: 'Scale',
                order: 1,
            },
            {
                title: 'Criminal Litigation',
                slug: 'criminal-litigation',
                shortDescription: 'Expert legal representation in Criminal Litigation.',
                fullDescription: '# Criminal Litigation\n\nWe provide comprehensive legal services in Criminal Litigation.',
                icon: 'Gavel',
                order: 2,
            },
            {
                title: 'Matrimonial & Family Law',
                slug: 'matrimonial-family-law',
                shortDescription: 'Expert legal representation in Matrimonial & Family Law.',
                fullDescription: '# Matrimonial & Family Law\n\nWe provide comprehensive legal services in Matrimonial & Family Law.',
                icon: 'Users',
                order: 3,
            },
            {
                title: 'Property & Land Disputes',
                slug: 'property-land-disputes',
                shortDescription: 'Expert legal representation in Property & Land Disputes.',
                fullDescription: '# Property & Land Disputes\n\nWe provide comprehensive legal services in Property & Land Disputes.',
                icon: 'Home',
                order: 4,
            },
            {
                title: 'Corporate & Commercial Litigation',
                slug: 'corporate-commercial-litigation',
                shortDescription: 'Expert legal representation in Corporate & Commercial Litigation.',
                fullDescription: '# Corporate & Commercial Litigation\n\nWe provide comprehensive legal services in Corporate & Commercial Litigation.',
                icon: 'Briefcase',
                order: 5,
            },
            {
                title: 'Arbitration & Mediation',
                slug: 'arbitration-mediation',
                shortDescription: 'Expert legal representation in Arbitration & Mediation.',
                fullDescription: '# Arbitration & Mediation\n\nWe provide comprehensive legal services in Arbitration & Mediation.',
                icon: 'Handshake',
                order: 6,
            },
            {
                title: 'Company Law (NCLT / NCLAT)',
                slug: 'company-law-nclt-nclat',
                shortDescription: 'Expert legal representation in Company Law (NCLT / NCLAT).',
                fullDescription: '# Company Law (NCLT / NCLAT)\n\nWe provide comprehensive legal services in Company Law (NCLT / NCLAT).',
                icon: 'Building',
                order: 7,
            },
            {
                title: 'Debt Recovery & Financial Litigation',
                slug: 'debt-recovery-financial-litigation',
                shortDescription: 'Expert legal representation in Debt Recovery & Financial Litigation.',
                fullDescription: '# Debt Recovery & Financial Litigation\n\nWe provide comprehensive legal services in Debt Recovery & Financial Litigation.',
                icon: 'Landmark',
                order: 8,
            },
            {
                title: 'Constitutional & Writ Jurisdiction',
                slug: 'constitutional-writ-jurisdiction',
                shortDescription: 'Expert legal representation in Constitutional & Writ Jurisdiction.',
                fullDescription: '# Constitutional & Writ Jurisdiction\n\nWe provide comprehensive legal services in Constitutional & Writ Jurisdiction.',
                icon: 'BookOpen',
                order: 9,
            },
            {
                title: 'Intellectual Property Rights (IPR)',
                slug: 'intellectual-property-rights-ipr',
                shortDescription: 'Expert legal representation in Intellectual Property Rights (IPR).',
                fullDescription: '# Intellectual Property Rights (IPR)\n\nWe provide comprehensive legal services in Intellectual Property Rights (IPR).',
                icon: 'Cpu',
                order: 10,
            },
            {
                title: 'Insolvency & Restructuring',
                slug: 'insolvency-restructuring',
                shortDescription: 'Expert legal representation in Insolvency & Restructuring.',
                fullDescription: '# Insolvency & Restructuring\n\nWe provide comprehensive legal services in Insolvency & Restructuring.',
                icon: 'TrendingDown',
                order: 11,
            },
            {
                title: 'Contractual & Commercial Disputes',
                slug: 'contractual-commercial-disputes',
                shortDescription: 'Expert legal representation in Contractual & Commercial Disputes.',
                fullDescription: '# Contractual & Commercial Disputes\n\nWe provide comprehensive legal services in Contractual & Commercial Disputes.',
                icon: 'FileText',
                order: 12,
            },
            {
                title: 'Regulatory & Tribunal Litigation',
                slug: 'regulatory-tribunal-litigation',
                shortDescription: 'Expert legal representation in Regulatory & Tribunal Litigation.',
                fullDescription: '# Regulatory & Tribunal Litigation\n\nWe provide comprehensive legal services in Regulatory & Tribunal Litigation.',
                icon: 'Shield',
                order: 13,
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
                fullName: 'Sarvesh Chowdhry',
                role: 'Advocate | Founder Member | Managing Partner',
                experience: '40+ Years',
                email: 'sarvesh@chowdhrylaw.com',
                imageUrl: '',
                bio: `With nearly four decades of distinguished legal practice, Sarvesh Chowdhry stands as the senior-most pillar of the Chambers. Enrolled as an Advocate in 1986 and admitted to practice before the Supreme Court of India, he brings exceptional depth, institutional insight, and commanding courtroom presence to the firm’s leadership.

Mr. Chowdhry completed both his Bachelor’s degree and legal education from the University of Delhi. He has also undergone advanced Advocacy Training and Skills Development Programs conducted by the British Council under the Inns of Court, United Kingdom. Building upon this specialised training, he has, along with a team of trained advocates, been actively involved in imparting structured advocacy and courtroom skills training to lawyers across India. Over the past two decades, this initiative has benefitted more than 18,000 advocates nationwide, making a significant contribution to professional legal education and capacity building.

His practice encompasses a wide spectrum of litigation and advisory work, including Civil and Criminal Litigation, Corporate and Commercial Disputes, Matrimonial & Family Law, Company Law, Mergers & Acquisitions, Debt Recovery, Arbitration, Mediation, and Land Acquisition matters. Having served in key public and institutional roles, Mr. Chowdhry is widely respected for his strategic clarity, principled approach, and consistently result-oriented legal counsel.

### Professional Appointments & Affiliations

*   **Counsel for Punjab National Bank (PNB)**
*   **Panel ‘A’ Counsel for the Central Government before the Supreme Court of India**
*   **Part of the first batch of Mediators trained at the Supreme Court of India**
*   **Former Chief Legal Officer, Delhi Waqf Board**
*   **Former Member, Committee on Mediation, Arbitration and Conciliation, PHD Chamber of Commerce and Industry**
*   **Co-Chair, Law and Justice Committee, PHD Chamber of Commerce and Industry**`,
                order: 1,
            },
            {
                fullName: 'R. K. Pandey',
                role: 'Advocate | Senior Partner',
                experience: '28+ Years',
                imageUrl: '',
                bio: `With over 28 years of active legal practice, R. K. Pandey is a vital and respected member of the Chambers. He began his legal journey in 1988 and has been educated in Allahabad and Delhi, completing his B.A. (Hons.) from Jamia Millia Islamia and his law degree from Kanpur.

Mr. Pandey has practiced extensively across all Delhi District Courts and the High Court of Delhi. He has successfully argued several landmark matters, securing significant reliefs for clients, and is widely regarded for his practical insight, courtcraft, and reliability in complex litigation.`,
                order: 2
            },
            {
                fullName: 'Varun Verma',
                role: 'Advocate | Partner',
                experience: 'Experienced',
                imageUrl: '',
                bio: `Varun Verma completed his schooling in Delhi, graduated in B.Com. (Hons.), and obtained his law degree from Amity Law School, Noida. He practices before the Delhi District Courts, the High Court of Delhi, and the Supreme Court of India.

His practice also extends to specialized tribunals including the NGT, CAT, Armed Forces Tribunal, and various District Courts in cities such as Patna and Pune. He primarily specializes in Matrimonial and Civil Disputes, combining detailed preparation with a client-focused litigation strategy.`,
                order: 3
            },
            {
                fullName: 'Pushaan Singh Gullia',
                role: 'Advocate | Partner',
                experience: 'Experienced',
                imageUrl: '',
                bio: `Pushaan Singh Gullia completed his schooling from Mayo College, Ajmer, pursued English Literature at the University of Delhi, and earned his law degree from O.P. Jindal Global Law School.

He regularly appears before all Delhi District Courts, the High Court of Delhi, and the Supreme Court of India, along with tribunals including CAT, NCLT (Delhi & Mumbai), DRT, NCLAT, and DRAT. He specializes in Property and Criminal Disputes and is known for his structured advocacy and sharp legal analysis.`,
                order: 4
            },
            {
                fullName: 'Jyoti Das',
                role: 'Advocate | Partner',
                experience: '5+ Years',
                imageUrl: '',
                bio: `Jyoti Das completed her schooling in Delhi and obtained her law degree from Amity Law School. With over five years of experience, she has been actively practicing across Delhi courts.

Her work reflects strong procedural knowledge, diligent case preparation, and a committed approach to client representation, making her a valuable member of the Chambers.`,
                order: 5
            },
            {
                fullName: 'Mohd. Anwar Aman',
                role: 'Advocate | Partner',
                experience: '5+ Years',
                imageUrl: '',
                bio: `Mohd. Anwar Aman completed his schooling in Delhi and pursued his B.A. LL.B. (Hons.) from Haryana, followed by an LL.M. from Haryana. Early in his career, he worked as a Legal Researcher at the Hon’ble High Court of Delhi, gaining valuable exposure to judicial reasoning, constitutional interpretation, and court-driven legal analysis.

With over five years of active litigation experience, Mr. Aman has practiced extensively before all Delhi District Courts and the High Court of Delhi. His background in legal research, combined with hands-on courtroom practice, enables him to approach matters with strong doctrinal clarity, procedural precision, and practical advocacy.

As a Partner at the Chambers, he plays a key role in litigation strategy, drafting, and court appearances, contributing to the firm’s research-driven and solution-oriented legal practice.`,
                order: 6
            },
            {
                fullName: 'Kshitij Singh',
                role: 'Advocate | Partner',
                experience: 'Experienced',
                imageUrl: '',
                bio: `Kshitij Singh completed his schooling from Air Force Bal Bharati School, Delhi, and obtained his B.A. LL.B. degree from University School of Law and Legal Studies (USLLS), Guru Gobind Singh Indraprastha University, Delhi.

He regularly practices before the High Court of Delhi, the Supreme Court of India, and various Delhi District Courts. As a Partner at the Chambers, Mr. Singh is actively involved in court appearances, drafting, and litigation strategy, contributing to the firm’s comprehensive and courtroom-focused practice.`,
                order: 7
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

        // --- Contact Page ---
        const existingContact = await Page.findOne({ slug: 'contact' });
        if (!existingContact) {
            await Page.create({
                title: 'Contact Us',
                slug: 'contact',
                isPublished: true,
                metaDesc: 'Get in touch with Chowdhry Law Chambers for expert legal guidance and representation.',
                sections: [
                    {
                        type: 'CONTACT_DETAILED',
                        order: 0,
                        content: {}
                    }
                ]
            });
            console.log('✅ Contact page created');
        }

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
