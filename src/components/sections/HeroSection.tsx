
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-[100vh] relative flex items-center justify-center overflow-hidden bg-tech-dark">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-tech-purple/10 rounded-full blur-[100px] z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-tech-blue/10 rounded-full blur-[100px] z-0 animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tech-purple/20 rounded-full blur-[100px] z-0 animate-float-slow" style={{ animationDelay: "-3s" }}></div>
    
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative py-20 flex flex-col items-center">
        {/* Badge */}
        <div className="mb-6 animate-slide-down opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <div className="px-4 py-2 bg-secondary/40 backdrop-blur-sm rounded-full flex items-center gap-2 border border-white/10">
            <span className="h-2 w-2 rounded-full bg-tech-purple"></span>
            <span className="text-sm">Launching new enterprise solutions for 2025</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-6 animate-slide-down opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          We Build <span className="text-gradient">Future-Ready</span> Solutions
        </h1>
        
        <p className="text-xl text-center text-muted-foreground max-w-3xl mb-10 animate-slide-down opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          From innovative startups to enterprise-level projects, we create powerful software solutions using cutting-edge technologies that drive business growth.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-down opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <Button size="lg" className="bg-tech-purple hover:bg-tech-purple/80 group">
            Explore Our Work 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" className="border-muted">
            Get In Touch
          </Button>
        </div>
        
        {/* Tech Logos */}
        <div className="mt-20 w-full max-w-4xl animate-slide-up opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          <p className="text-center text-muted-foreground mb-6">Trusted by innovative companies</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
            <TechLogo name="Adobe" />
            <TechLogo name="Shopify" />
            <TechLogo name="Spotify" />
            <TechLogo name="Slack" />
            <TechLogo name="Google" />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-[2px] h-8 bg-gradient-to-b from-transparent to-tech-purple"></div>
        <div className="mt-2 text-sm text-muted-foreground">Scroll Down</div>
      </div>
    </section>
  );
};

const TechLogo = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-center h-12">
      <span className="text-xl font-bold tracking-wider">{name}</span>
    </div>
  );
};

export default HeroSection;
