

import Hero from "./Hero";
import HeroSlider from "./HeroSlider";
import ServicesGrid from "./ServicesGrid";
import About from "./About";
import Stats from "./Stats";
import Testimonials from "./Testimonials";
import BlogSection from "./BlogSection";
import ClientLogos from "./ClientLogos";
import MapSectionEditable from "./MapSectionEditable";

export default function SectionRenderer({ section }: { section: any }) {
    // Parsing content if it's a string (back compatibility) or Object
    const content = typeof section.content === 'string'
        ? JSON.parse(section.content)
        : section.content;

    switch (section.type) {
        case 'HERO':
            return <Hero data={content} />;
        case 'HERO_SLIDER':
            return <HeroSlider />;
        case 'SERVICES_GRID':
            return <ServicesGrid data={content} />;
        case 'ABOUT':
            return <About data={content} />;
        case 'STATS':
            return <Stats />;
        case 'TESTIMONIALS':
            return <Testimonials data={content} />;
        case 'BLOG':
            return <BlogSection data={content} />;
        case 'CLIENT_LOGOS':
            return <ClientLogos data={content} />;
        case 'MAP':
            return <MapSectionEditable data={content} />;
        default:
            return null;
    }
}
