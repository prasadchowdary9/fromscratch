
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
}

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) => {
  const inputProps = {
    id: name,
    name,
    value,
    onChange,
    placeholder,
    className: error ? 'border-destructive' : ''
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={error ? 'text-destructive' : ''}>
        {label} {error && <span className="text-destructive">*</span>}
      </Label>
      {type === 'textarea' ? (
        <Textarea
          {...inputProps}
          className={`min-h-[120px] ${error ? 'border-destructive' : ''}`}
        />
      ) : (
        <Input
          {...inputProps}
          type={type}
        />
      )}
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
    </div>
  );
};

export default FormField;
