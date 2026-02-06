require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

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

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

const newTeamMembers = [
    {
        fullName: 'Sarvesh Chowdhry',
        role: 'Advocate | Founder Member | Managing Partner',
        experience: '40+ Years',
        email: 'sarvesh@chowdhrylaw.com', // Placeholder email
        imageUrl: '', // Placeholder, user will need to add manually or provide url
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
        order: 1
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

async function updateTeamMembers() {
    try {
        console.log('🔄 Connecting to database...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('🗑️ Clearing existing team members...');
        await TeamMember.deleteMany({});

        console.log('🌱 Seeding new team members...');
        for (const member of newTeamMembers) {
            await TeamMember.create(member);
            console.log(`✅ Created: ${member.fullName}`);
        }

        console.log('✨ Team Members updated successfully!');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error updating database:', error);
        process.exit(1);
    }
}

updateTeamMembers();
