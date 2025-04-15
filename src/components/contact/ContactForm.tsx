
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';
import FormField from './components/FormField';
import { FormData } from './types/form-types';
import { validateForm } from './utils/form-validation';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
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
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
        />
        
        <div className="md:col-span-2">
          <FormField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name (optional)"
          />
        </div>
        
        <div className="md:col-span-2">
          <FormField
            label="Project Requirements"
            name="requirements"
            type="textarea"
            value={formData.requirements}
            onChange={handleChange}
            error={errors.requirements}
            placeholder="Tell us about your project and requirements"
          />
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
