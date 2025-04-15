
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
    file: null as File | null,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [fileName, setFileName] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, file }));
      setFileName(file.name);
      
      // Clear file error if it exists
      if (errors['file']) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors['file'];
          return newErrors;
        });
      }
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.requirements.trim()) newErrors.requirements = 'Please describe your project requirements';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // Show success toast
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24-48 hours.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      requirements: '',
      file: null,
    });
    setFileName('');
  };
  
  const clearFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setFileName('');
  };
  
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className={errors.name ? 'text-destructive' : ''}>
                  Name {errors.name && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? 'text-destructive' : ''}>
                  Email {errors.email && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="requirements" className={errors.requirements ? 'text-destructive' : ''}>
                  Project Requirements {errors.requirements && <span className="text-destructive">*</span>}
                </Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Tell us about your project and requirements"
                  className={`min-h-[120px] ${errors.requirements ? 'border-destructive' : ''}`}
                />
                {errors.requirements && (
                  <p className="text-destructive text-sm">{errors.requirements}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label>Attachments (Optional)</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    {!fileName ? (
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-card/50 hover:bg-card/80 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="mb-1 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF, DOC, PPT, PNG, JPG (MAX. 10MB)
                          </p>
                        </div>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between w-full p-4 border border-border rounded-lg bg-secondary/30">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-tech-purple/10 flex items-center justify-center">
                            <Check className="h-5 w-5 text-tech-purple" />
                          </div>
                          <span className="ml-3 text-sm truncate max-w-[200px]">{fileName}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearFile}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                type="submit"
                className="bg-tech-purple hover:bg-tech-purple/80 w-full md:w-auto md:px-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
