
import { useState ,useEffect} from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from './FileUpload';
import FormField from './components/FormField';
import axios from 'axios';

import { validateForm } from './utils/form-validation';
import { Description } from '@radix-ui/react-dialog';
import {ContactFormData} from './types/form-types';
import { CheckCircle } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ContactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone:'',
    title:'',
    description: '',
    file: null,
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [fileName, setFileName] = useState('');


  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
    
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
      setContactFormData(prev => ({ ...prev, file }));
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
  
    // Validate form if needed
    // const newErrors = validateForm(ContactFormData);
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }
  
    setIsSubmitting(true);
  
    const form = new FormData();  // Corrected: Use FormData, not ContactFormData
  
    form.append('name', ContactFormData.name);
    form.append('email', ContactFormData.email);
    form.append('company', ContactFormData.company);
    form.append('title', ContactFormData.title);
    form.append('description', ContactFormData.description);
    form.append('phoneNumber', ContactFormData.phone);
  
    if (ContactFormData.file) {
      form.append('file', ContactFormData.file);
    }
  
    try {
      const response = await fetch('https://fromscracesproject-9.onrender.com/api/documents/upload', {
        method: 'POST',
        body: form, // ⚠️ Don't set Content-Type manually!
      });
  
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 1 hour.",
          duration: 5000,
        });
      }
  
      // Optionally, delay the toast to mimic some async action (e.g., network latency)
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Trigger success toast after successful upload
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 1 hour.",
        duration: 5000,
      });
  
      // Reset form data after successful submission
      setContactFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        title: '',
        description: '',
        file: null,
      });
      setFileName('');
    } catch (error) {
      console.error('Error uploading document:', error);
      

      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-red-600" />
            <span>Error uploading document</span>
          </div>
        ),
        description: "plz upload a small size file ",
        duration: 5000,
        className: "bg-red-100 text-red-800",
      });
      
  
      // Show an error toast if something goes wrong
     
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const clearFile = () => {
    setContactFormData(prev => ({ ...prev, file: null }));
    setFileName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          name="name"
          value={ContactFormData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        
        <FormField
          label="Phone"
          name="phone"
          value={ContactFormData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Your phone number"
        />
        
        <FormField
          label="Email"
          name="email"
          type="email"
          value={ContactFormData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your.email@example.com"
        />
        
        <FormField
          label="Title"
          name="title"
          value={ContactFormData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Your project title"
        />
        
        <div className="md:col-span-2">
          <FormField
            label="Company/College"
            name="company"
            value={ContactFormData.company}
            onChange={handleChange}
            placeholder="Your company or college name (optional)"
          />
        </div>
        
        <div className="md:col-span-2">
          
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={ContactFormData.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Your project description"    
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