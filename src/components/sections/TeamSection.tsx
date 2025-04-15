
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Sophia Williams",
    role: "Business Analyst",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    description: "Transforms business requirements into technical specifications for our development team.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Michael Chen",
    role: "Sr. Developer",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    description: "Leads our development team with over 10 years of experience in enterprise applications.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Amelia Patel",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    description: "Creates stunning user interfaces that enhance user experience and drive engagement.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    description: "Ensures smooth deployment and continuous integration for all our projects.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Olivia Rodriguez",
    role: "QA Tester",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    description: "Maintains our high quality standards through rigorous testing methodologies.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  }
];

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % teamMembers.length;
    goToSlide(newIndex);
  };
  
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length;
    goToSlide(newIndex);
  };
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  return (
    <section id="team" className="py-24 bg-tech-dark-alt relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-2">
            <div className="px-3 py-1 bg-tech-purple/10 text-tech-purple rounded-full text-sm font-medium">
              Our Team
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet Our <span className="text-gradient">Crew</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl">
            Our diverse team of experts brings creativity, expertise, and passion to every project.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Team carousel */}
          <div 
            ref={containerRef}
            className="relative overflow-hidden h-[500px] sm:h-[400px]"
          >
            <div 
              className="absolute inset-0 flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="min-w-full h-full flex flex-col sm:flex-row items-center gap-8 px-4"
                >
                  <div className="w-full sm:w-1/2 flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-tech-purple to-tech-blue rounded-full opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative aspect-square w-64 h-64 rounded-full overflow-hidden border-4 border-background">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-1/2 text-center sm:text-left">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <div className="inline-block px-3 py-1 bg-tech-purple/20 text-tech-purple rounded-full text-sm font-medium mb-4">
                      {member.role}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {member.description}
                    </p>
                    <div className="flex justify-center sm:justify-start space-x-4">
                      <a 
                        href={member.social.linkedin}
                        className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-tech-purple transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={member.social.twitter}
                        className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-tech-purple transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                      <a 
                        href={member.social.github}
                        className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-tech-purple transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 -translate-y-1/2 transform -translate-x-1/2 rounded-full border-border/50 hover:border-tech-purple hover:bg-tech-purple/10 z-20 hidden md:flex"
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 -translate-y-1/2 transform translate-x-1/2 rounded-full border-border/50 hover:border-tech-purple hover:bg-tech-purple/10 z-20 hidden md:flex"
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-tech-purple w-6"
                    : "bg-secondary hover:bg-tech-purple/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
