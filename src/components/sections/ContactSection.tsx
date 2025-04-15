
import ContactForm from '@/components/contact/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-tech-dark-alt">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-2">
            <div className="px-3 py-1 bg-tech-purple/10 text-tech-purple rounded-full text-sm font-medium">
              Get in Touch
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl">
            Ready to transform your ideas into reality? Share your project requirements with us, and we'll help you create the perfect solution.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-card rounded-lg border border-border/50 p-6 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
