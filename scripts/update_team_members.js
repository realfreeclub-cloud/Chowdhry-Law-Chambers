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
    }
    // Add more members here as needed
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
