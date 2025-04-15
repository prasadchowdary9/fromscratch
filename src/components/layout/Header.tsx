
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md py-3 shadow-md" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link 
          to="/" 
          className="text-2xl font-bold text-gradient animate-pulse-soft"
        >
          TechVisionForge
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
          <Button className="bg-tech-purple hover:bg-tech-purple/80">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-foreground"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[60px] bg-background z-40 md:hidden animate-slide-down">
            <div className="flex flex-col items-center justify-center h-full gap-8 text-lg">
              <NavLinks onClick={() => setIsMenuOpen(false)} />
              <Button 
                className="bg-tech-purple hover:bg-tech-purple/80"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  return (
    <>
      <a 
        href="#services" 
        onClick={onClick}
        className="text-foreground/80 hover:text-foreground transition-colors"
      >
        Services
      </a>
      <a 
        href="#team" 
        onClick={onClick}
        className="text-foreground/80 hover:text-foreground transition-colors"
      >
        Team
      </a>
      <a 
        href="#projects" 
        onClick={onClick}
        className="text-foreground/80 hover:text-foreground transition-colors"
      >
        Projects
      </a>
      <a 
        href="#contact" 
        onClick={onClick}
        className="text-foreground/80 hover:text-foreground transition-colors"
      >
        Contact
      </a>
    </>
  );
};

export default Header;
