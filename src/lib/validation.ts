// Input validation utilities

export const validators = {
    // Email validation
    email: (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },

    // Phone validation (flexible format)
    phone: (value: string): boolean => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
    },

    // URL validation
    url: (value: string): boolean => {
        if (!value || typeof value !== 'string') return false;
        const trimmed = value.trim();
        if (trimmed === '') return false;
        try {
            new URL(trimmed);
            return true;
        } catch {
            return false;
        }
    },

    // String length validation
    stringLength: (value: string, min: number, max: number): boolean => {
        return value.length >= min && value.length <= max;
    },

    // Slug validation (lowercase, hyphens, alphanumeric)
    slug: (value: string): boolean => {
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        return slugRegex.test(value);
    },

    // Sanitize HTML (basic XSS prevention)
    sanitizeHtml: (value: string): string => {
        return value
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },

    // File type validation
    fileType: (filename: string, allowedTypes: string[]): boolean => {
        const ext = filename.split('.').pop()?.toLowerCase();
        return ext ? allowedTypes.includes(ext) : false;
    },

    // File size validation (in bytes)
    fileSize: (size: number, maxSizeMB: number): boolean => {
        const maxBytes = maxSizeMB * 1024 * 1024;
        return size <= maxBytes;
    },
};

// Validation schemas for common entities
export const schemas = {
    practiceArea: {
        title: (value: string) => validators.stringLength(value, 3, 100),
        slug: (value: string) => validators.slug(value) && validators.stringLength(value, 3, 100),
        shortDescription: (value: string) => validators.stringLength(value, 10, 300),
    },

    job: {
        title: (value: string) => validators.stringLength(value, 5, 150),
        location: (value: string) => validators.stringLength(value, 2, 100),
        description: (value: string) => validators.stringLength(value, 50, 10000),
    },

    appointment: {
        name: (value: string) => validators.stringLength(value, 2, 100),
        email: (value: string) => validators.email(value),
        phone: (value: string) => validators.phone(value),
        practiceArea: (value: string) => value === undefined || value === null || validators.stringLength(value, 0, 100),
        date: (value: any) => value !== undefined && value !== null, // Should be a valid date string or object
        message: (value: string) => value === undefined || value === null || validators.stringLength(value, 0, 1000),
    },

    application: {
        fullName: (value: string) => validators.stringLength(value, 2, 100),
        email: (value: string) => validators.email(value),
        phone: (value: string) => validators.phone(value),
        resumeUrl: (value: string) => validators.url(value),
        coverLetter: (value: string) => validators.stringLength(value, 0, 2000),
    },
};

// File upload configuration
export const fileUploadConfig = {
    resume: {
        allowedTypes: ['pdf', 'doc', 'docx'],
        maxSizeMB: 5,
    },
    image: {
        allowedTypes: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
        maxSizeMB: 10,
    },
    document: {
        allowedTypes: ['pdf', 'doc', 'docx', 'txt'],
        maxSizeMB: 10,
    },
};

// Validate file upload
export function validateFileUpload(
    file: File,
    type: 'resume' | 'image' | 'document'
): { valid: boolean; error?: string } {
    const config = fileUploadConfig[type];

    // Check file type
    if (!validators.fileType(file.name, config.allowedTypes)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${config.allowedTypes.join(', ')}`,
        };
    }

    // Check file size
    if (!validators.fileSize(file.size, config.maxSizeMB)) {
        return {
            valid: false,
            error: `File too large. Maximum size: ${config.maxSizeMB}MB`,
        };
    }

    return { valid: true };
}

// Validate request body
export function validateRequestBody<T extends Record<string, any>>(
    body: T,
    schema: Record<keyof T, (value: any) => boolean>
): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    for (const [key, validator] of Object.entries(schema)) {
        const value = body[key as keyof T];
        if (value !== undefined && value !== null && !validator(value)) {
            errors.push(`Invalid ${key}`);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
