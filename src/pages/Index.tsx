
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TeamSection from "@/components/sections/TeamSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useEffect } from "react";
import 'aos/dist/aos.css'; // Properly import AOS CSS

const Index = () => {
  // Initialize animation on scroll
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const AOS = (await import('aos')).default;
        
        AOS.init({
          duration: 800,
          once: false,
          mirror: true,
        });
        
        // Refresh AOS on window resize for responsive animations
        window.addEventListener('resize', () => {
          AOS.refresh();
        });
        
      } catch (error) {
        console.error("Failed to initialize animations:", error);
      }
    };
    
    initAnimations();
  }, []);
  
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
