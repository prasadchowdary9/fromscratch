
import { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ["All", "Web Apps", "Mobile Apps", "AI Tools", "Enterprise"];

const projects = [
  {
    title: "Finance Dashboard",
    description: "An interactive dashboard for financial data visualization and analysis.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2426&q=80",
    category: "Web Apps",
    link: "#"
  },
  {
    title: "Health Tracker App",
    description: "Mobile application for tracking health metrics and fitness goals.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    category: "Mobile Apps",
    link: "#"
  },
  {
    title: "E-commerce Platform",
    description: "Full-featured e-commerce solution with inventory management.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    category: "Enterprise",
    link: "#"
  },
  {
    title: "Content Analyzer",
    description: "AI-powered tool for analyzing and optimizing written content.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    category: "AI Tools",
    link: "#"
  },
  {
    title: "Travel Companion",
    description: "Mobile app for planning trips and discovering local experiences.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    category: "Mobile Apps",
    link: "#"
  },
  {
    title: "Supply Chain Manager",
    description: "Enterprise solution for tracking and managing supply chains.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    category: "Enterprise",
    link: "#"
  }
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-tech-blue/10 rounded-full blur-[120px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-2">
            <div className="px-3 py-1 bg-tech-purple/10 text-tech-purple rounded-full text-sm font-medium">
              Our Portfolio
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Work</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl">
            Explore our latest projects showcasing our expertise across different domains and technologies.
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? "bg-tech-purple text-white" 
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-lg overflow-hidden border border-border/50 h-[350px]"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              data-aos="zoom-in"
              data-aos-delay={100 * (index % 3)}
            >
              {/* Project Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              </div>
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white/90 rounded-full text-xs">
                  {project.category}
                </span>
              </div>
              
              {/* Project Info */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 transform transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 mb-4 opacity-0 transform translate-y-10 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center opacity-0 transform translate-y-10 transition-all duration-300 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
                  <Button size="sm" variant="outline" className="border-white/20 hover:border-white/60 text-white">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <a
                    href={project.link}
                    className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-tech-purple transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
              
              {/* Hover effect overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-shine opacity-0 transition-opacity duration-700 pointer-events-none ${hoveredProject === index ? 'opacity-20 animate-background-shine' : ''}`}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button className="bg-tech-purple hover:bg-tech-purple/80">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
