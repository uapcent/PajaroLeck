import Hero from '../../../components/Hero.jsx';
import AboutSection from '../../../components/AboutSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { about } from '../config.js';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection about={about} />
      <ServicesSection />
    </>
  );
}
