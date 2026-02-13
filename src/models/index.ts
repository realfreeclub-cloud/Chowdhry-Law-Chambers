import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Interfaces ---

export interface ISiteConfig extends Document {
    name: string;
    theme: {
        mode: 'light' | 'dark' | 'system';
        preset: 'default' | 'classic' | 'corporate';
        primaryColor: string;
        secondaryColor: string;
        buttonColor: string;
        textColor: string;
        backgroundColor: string;
        headingFont: string;
        bodyFont: string;
        borderRadius: string;
    };
    contact: {
        email: string;
        phone: string;
        address: string;
        mapUrl?: string;
        showMapOnHome: boolean;
    };
    socialMedia?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
    disclaimer: {
        enabled: boolean;
        title: string;
        text: string;
        acceptBtnText: string;
    };
    logoUrl?: string;
    header?: {
        workingHours: string;
        showTopBar: boolean;
        showSocialMedia: boolean;
        logoHeight?: string;
    };
    footer?: {
        description: string;
        showSocialMedia: boolean;
        showLogo?: boolean;
        logoHeight?: string;
    };
    menu?: {
        label: string;
        href: string;
        order: number;
    }[];
    clientsSection?: {
        title: string;
        subtitle: string;
    };
}

export interface IPracticeArea extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    icon?: string; // Icon name or URL
    imageUrl?: string;
    showOnHome?: boolean;
    order: number;
}

export interface ITeamMember extends Document {
    fullName: string;
    role: string;
    bio: string;
    imageUrl?: string;
    experience?: string;
    email?: string;
    linkedinUrl?: string;
    order: number;
}

export interface IJob extends Document {
    title: string;
    department?: string; // Practice area
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    experience?: string; // e.g. "2-5 years"
    description: string; // HTML or Markdown
    isActive: boolean;
    isPublished: boolean;
    postedAt: Date;
}

export interface IApplicant extends Document {
    jobId: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string;
    coverLetter?: string;
    status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected';
    createdAt: Date;
}

export interface IAppointment extends Document {
    name: string;
    email: string;
    phone: string;
    practiceArea?: string;
    teamMember?: string; // New field
    date: Date;
    message?: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    createdAt: Date;
}

export interface ISlider extends Document {
    title: string;
    subtitle: string;
    imageUrl: string;
    link?: string;
    buttonText?: string;
    description?: string;
    titleFontSize?: string;
    subtitleFontSize?: string;
    descFontSize?: string;
    order: number;
    isActive: boolean;
}

export interface IPage extends Document {
    slug: string;
    title: string;
    metaDesc?: string;
    isPublished: boolean;
    sections: any[]; // Flexible sections
    content: any; // Flexible JSON for generic pages not covered by specific models
    createdAt: Date;
    updatedAt: Date;
}

export interface IAdmin extends Document {
    email: string;
    passwordHash: string;
}

export interface IGallery extends Document {
    title: string;
    url: string;
    category?: string;
    showInGallery: boolean;
    order: number;
    createdAt: Date;
}

export interface IBlogCategory extends Document {
    name: string;
    slug: string;
    description?: string;
    count?: number; // Virtual for frontend
}

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string; // Stored as name or reference
    tags: string[];
    author: string;
    status: 'Draft' | 'Published';
    publishedAt: Date;
    readTime: number; // Simple calc in minutes
    seo: {
        metaTitle: string;
        metaDesc: string;
        focusKeyword: string;
    };
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

// --- Schemas ---

const SiteConfigSchema = new Schema<ISiteConfig>({
    name: { type: String, default: 'Chowdhry Law Chambers' },
    theme: {
        mode: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
        preset: { type: String, enum: ['default', 'classic', 'corporate'], default: 'corporate' },
        primaryColor: { type: String, default: '#0f172a' },
        secondaryColor: { type: String, default: '#d4af37' }, // Updated to Gold
        buttonColor: { type: String, default: '#d4af37' },
        textColor: { type: String, default: '#334155' },
        backgroundColor: { type: String, default: '#ffffff' },
        headingFont: { type: String, default: 'Inter' },
        bodyFont: { type: String, default: 'Inter' },
        borderRadius: { type: String, default: '0.5rem' },
    },
    contact: {
        email: { type: String, default: 'office@chowdhrylaw.com' },
        phone: { type: String, default: '+91 98111 25450' },
        address: { type: String, default: '20, Todarmal Rd, Bengali Market, New Delhi - 110001' },
        mapUrl: { type: String, default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.031119690018!2d77.2329824!3d28.628829399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd2c4152b10d%3A0xa4881b34e1c4749d!2s20%2C%20Todarmal%20Rd%2C%20Bengali%20Market%2C%20Todermal%20Road%20Area%2C%20Mandi%20House%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1771009745181!5m2!1sen!2sin' },
        showMapOnHome: { type: Boolean, default: true },
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
    header: {
        workingHours: { type: String, default: 'Mon – Sun: 9.00 am – 8.00pm' },
        showTopBar: { type: Boolean, default: true },
        showSocialMedia: { type: Boolean, default: true },
        logoHeight: { type: String, default: '3rem' },
    },
    footer: {
        description: { type: String, default: 'Providing exceptional legal services with integrity, dedication, and expertise.' },
        showSocialMedia: { type: Boolean, default: true },
        showLogo: { type: Boolean, default: true },
        logoHeight: { type: String, default: '3rem' },
    },
    menu: [{
        label: { type: String, required: true },
        href: { type: String, required: true },
        order: { type: Number, default: 0 }
    }],
    clientsSection: {
        title: { type: String, default: 'What Our Clients Say' },
        subtitle: { type: String, default: 'Testimonials' },
    },
});

const PracticeAreaSchema = new Schema<IPracticeArea>({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    icon: { type: String },
    imageUrl: { type: String },
    showOnHome: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
});

const TeamMemberSchema = new Schema<ITeamMember>({
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    imageUrl: { type: String },
    experience: { type: String },
    email: { type: String },
    linkedinUrl: { type: String },
    order: { type: Number, default: 0 },
});

const JobSchema = new Schema<IJob>({
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

const ApplicantSchema = new Schema<IApplicant>({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    coverLetter: { type: String },
    status: { type: String, enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected'], default: 'New' },
    createdAt: { type: Date, default: Date.now },
});

const AppointmentSchema = new Schema<IAppointment>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    practiceArea: { type: String },
    teamMember: { type: String },
    date: { type: Date, required: true },
    message: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const SliderSchema = new Schema<ISlider>({
    title: { type: String },
    subtitle: { type: String },
    imageUrl: { type: String, required: true },
    link: { type: String },
    buttonText: { type: String, default: 'Learn More' },
    description: { type: String },
    titleFontSize: { type: String, default: '5rem' }, // Default for 5xl-7xl logic
    subtitleFontSize: { type: String, default: '0.875rem' },
    descFontSize: { type: String, default: '1.125rem' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
});

const PageSchema = new Schema<IPage>({
    slug: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    metaDesc: { type: String },
    isPublished: { type: Boolean, default: false },
    sections: [{ type: Schema.Types.Mixed }],
    content: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const AdminSchema = new Schema<IAdmin>({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
});

const GallerySchema = new Schema<IGallery>({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, default: 'General' },
    showInGallery: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

const BlogCategorySchema = new Schema<IBlogCategory>({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
});

const BlogPostSchema = new Schema<IBlogPost>({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    excerpt: { type: String },
    content: { type: String, required: true }, // Markdown
    featuredImage: { type: String },
    category: { type: String, default: 'General' },
    tags: [{ type: String }],
    author: { type: String, default: 'Admin' },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    publishedAt: { type: Date },
    readTime: { type: Number, default: 5 },
    seo: {
        metaTitle: { type: String },
        metaDesc: { type: String },
        focusKeyword: { type: String },
    },
    views: { type: Number, default: 0 },
}, { timestamps: true });

// --- Models ---
export const SiteConfig: Model<ISiteConfig> = mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);
export const PracticeArea: Model<IPracticeArea> = mongoose.models.PracticeArea || mongoose.model<IPracticeArea>('PracticeArea', PracticeAreaSchema);
export const TeamMember: Model<ITeamMember> = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
export const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
export const Applicant: Model<IApplicant> = mongoose.models.Applicant || mongoose.model<IApplicant>('Applicant', ApplicantSchema);
export const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
export const Slider: Model<ISlider> = mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);
export const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema);
export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
export const Gallery: Model<IGallery> = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
export const BlogCategory: Model<IBlogCategory> = mongoose.models.BlogCategory || mongoose.model<IBlogCategory>('BlogCategory', BlogCategorySchema);
export const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
export interface IClient extends Document {
    name: string;
    logoUrl: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
}

const ClientSchema = new Schema<IClient>({
    name: { type: String, default: '' },
    logoUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const Client: Model<IClient> = mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
