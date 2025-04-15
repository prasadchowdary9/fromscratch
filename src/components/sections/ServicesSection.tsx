
import { useState } from 'react';
import { Code, Database, Cloud, Server, LayoutGrid, Phone, Globe, Cpu, Workflow, LayoutTemplate } from 'lucide-react';

const services = [
  {
    title: "Java Development",
    icon: <Cpu />,
    description: "Enterprise-grade applications powered by Java's robust ecosystem and reliability.",
    tags: ["Spring Boot", "Microservices", "Hibernate", "JPA"],
  },
  {
    title: "React.js",
    icon: <LayoutGrid />,
    description: "Dynamic front-end solutions with React's component-based architecture.",
    tags: ["Next.js", "Redux", "React Hooks", "Tailwind CSS"],
  },
  {
    title: ".NET Development",
    icon: <Server />,
    description: "Scalable enterprise applications built on Microsoft's powerful .NET framework.",
    tags: ["C#", "ASP.NET Core", "Blazor", "Entity Framework"],
  },
  {
    title: "Python Solutions",
    icon: <Code />,
    description: "Data-driven applications leveraging Python's versatility and libraries.",
    tags: ["Django", "Flask", "Data Science", "Machine Learning"],
  },
  {
    title: "Node.js",
    icon: <Workflow />,
    description: "Fast, scalable back-end services with JavaScript's server-side runtime.",
    tags: ["Express.js", "GraphQL", "MongoDB", "Real-time apps"],
  },
  {
    title: "Mobile Development",
    icon: <Phone />,
    description: "Native and cross-platform mobile apps for iOS and Android devices.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    title: "Cloud Services",
    icon: <Cloud />,
    description: "Scalable cloud solutions on AWS, Azure, and Google Cloud platforms.",
    tags: ["DevOps", "Serverless", "Docker", "Kubernetes"],
  },
  {
    title: "Custom API Design",
    icon: <Database />,
    description: "RESTful and GraphQL APIs that connect your systems and enable innovation.",
    tags: ["API Gateway", "Microservices", "Swagger", "Authentication"],
  },
  {
    title: "Web Apps",
    icon: <Globe />,
    description: "Full-stack web applications with modern front-end and robust back-end.",
    tags: ["SPA", "Progressive Web Apps", "Responsive Design"],
  },
  {
    title: "UI/UX Design",
    icon: <LayoutTemplate />,
    description: "User-centered design that delivers exceptional digital experiences.",
    tags: ["Wireframing", "Prototyping", "User Testing", "Design Systems"],
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-1/2 bg-tech-purple/20 rounded-full blur-[120px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-2">
            <div className="px-3 py-1 bg-tech-purple/10 text-tech-purple rounded-full text-sm font-medium">
              Our Expertise
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What We <span className="text-gradient">Work With</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl">
            We leverage cutting-edge technologies to deliver complete tech solutions
            for businesses of all sizes—from startups to enterprise-level projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-card border border-border/50 rounded-lg p-6 transition-all duration-300 hover:border-tech-purple/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] h-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-aos="fade-up"
              data-aos-delay={100 + (index % 3) * 100}
            >
              <div className={`w-12 h-12 rounded-lg mb-5 flex items-center justify-center bg-tech-purple/10 text-tech-purple transition-all duration-300 ${hoveredIndex === index ? 'bg-tech-purple text-white scale-110' : ''}`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              
              <p className="text-muted-foreground mb-5">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="inline-block px-2.5 py-1 bg-secondary/50 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div 
                className={`absolute inset-0 bg-gradient-shine opacity-0 transition-opacity duration-700 pointer-events-none ${hoveredIndex === index ? 'opacity-100 animate-background-shine' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
