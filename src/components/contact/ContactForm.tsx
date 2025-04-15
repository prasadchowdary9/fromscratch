
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';

interface FormData {
  name: string;
  email: string;
  company: string;
  requirements: string;
  file: File | null;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    requirements: '',
    file: null,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24-48 hours.",
      duration: 5000,
    });
    
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
            <FileUpload
              fileName={fileName}
              onFileChange={handleFileChange}
              onClearFile={clearFile}
            />
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
  );
};

export default ContactForm;
