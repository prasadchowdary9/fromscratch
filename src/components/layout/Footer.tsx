import { Link } from 'react-router-dom';
import { Facebook, Github, Linkedin, Twitter, Instagram, Mail, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AdminLoginModal from '../admin/AdminLoginModal';
import AdminPanel from '../admin/AdminPanel';

const Footer = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(false);
    setShowAdminPanel(true);
  };

  return (
    <footer className="bg-tech-dark border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="text-2xl font-bold text-gradient mb-6 block">
             FromScratchs.com
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Building innovative solutions for businesses of all sizes with cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com" />
              <SocialIcon icon={<Github size={20} />} href="https://github.com" />
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/#">Home</FooterLink>
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/#team">Our Team</FooterLink>
              <FooterLink href="/#projects">Projects</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <FooterLink href="/#services">Web Development</FooterLink>
              <FooterLink href="/#services">Mobile Applications</FooterLink>
              <FooterLink href="/#services">Cloud Solutions</FooterLink>
              <FooterLink href="/#services">API Design</FooterLink>
              <FooterLink href="/#services">DevOps & Support</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-tech-purple mt-1" />
                <span>fromcatchs@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-tech-purple mt-1" />
                <span>+91 99999#####</span>
              </div>
              <address className="text-muted-foreground not-italic">
                Guntur<br />
                ArundalPet<br />
                Andhra Pradesh, India
              </address>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} fromscratchs.com All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowLoginModal(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AdminLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center hover:bg-tech-purple transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  </li>
);

export default Footer;
