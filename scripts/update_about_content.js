require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawfirm';

const PageSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    sections: [{ type: mongoose.Schema.Types.Mixed }],
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

async function updateAboutSection() {
    try {
        console.log('🔄 Connecting to database...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        const page = await Page.findOne({ slug: 'home' });
        if (!page) {
            console.error('❌ Home page not found');
            process.exit(1);
        }

        const aboutContent = {
            subtitle: 'ABOUT US',
            title: 'Chowdhry Law Chambers',
            description: `Established in 1986, Chowdhry Law Chambers is a full-service litigation law firm based in Delhi, with a legacy spanning nearly four decades and three generations of legal practice. Since its inception, the Chambers has remained deeply rooted in courtroom advocacy while continuously evolving to meet the demands of modern litigation.

The firm operates through chambers at the Saket District Court and Tis Hazari District Court, along with offices at Badarpur, Delhi and Bengali Market, New Delhi, the latter serving as the firm’s principal office. From these bases, the Chambers handles litigation across India and selectively represents clients in matters involving international and cross-border elements.

Chowdhry Law Chambers maintains a robust litigation practice across Civil, Criminal, Commercial, and Constitutional domains. The firm regularly appears before the Supreme Court of India, the High Court of Delhi, various Delhi District Courts, and specialized tribunals including NGT, CAT, AFT, NCLT/NCLAT, and DRT/DRAT. Its practice also extends to the High Court of Madhya Pradesh, courts across Mumbai and Maharashtra, and trial courts and High Courts throughout India.`,
            // Preserve existing images if present in DB, but since we are modifying the 'content' object in the array, 
            // we need to be careful. The easiest way is to find the section and merge.
        };

        const sectionIndex = page.sections.findIndex(s => s.type === 'ABOUT');
        if (sectionIndex === -1) {
            console.log('⚠️ ABOUT section not found, creating new one...');
            page.sections.push({
                type: 'ABOUT',
                order: 1,
                content: aboutContent
            });
        } else {
            console.log('✅ Found ABOUT section, updating content...');
            // Merge existing content with new text (to keep images)
            const existingContent = page.sections[sectionIndex].content;
            page.sections[sectionIndex].content = {
                ...existingContent,
                ...aboutContent
            };
        }

        // Mark as modified mixed type
        page.markModified('sections');
        await page.save();

        console.log('✅ About Us section updated successfully!');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error updating database:', error);
        process.exit(1);
    }
}

updateAboutSection();
