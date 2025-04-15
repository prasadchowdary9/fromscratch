
import { Input } from "@/components/ui/input";
import { Upload, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  fileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
}

const FileUpload = ({ fileName, onFileChange, onClearFile }: FileUploadProps) => {
  return (
    <div className="w-full">
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
            onChange={onFileChange}
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
            onClick={onClearFile}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
