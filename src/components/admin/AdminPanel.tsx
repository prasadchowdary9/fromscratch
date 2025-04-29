import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Document {
  id: number;
  name: string;
  email: string;
  company: string;
  phoneNumber: string | null;
  title: string;
  description: string;
  uploadedAt: string;
  fileUrl: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const AdminPanel = ({ isOpen, onClose, onLogout }: AdminPanelProps) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8181/api/documents/getAll");
      if (!res.ok) throw new Error("Failed to fetch documents");
      const data = await res.json();
      setDocuments(data.reverse());
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              📄 Uploaded Documents
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              onClick={fetchDocuments}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded"
            >
              Get Data
            </Button>
            <Button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded"
            >
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : documents.length > 0 ? (
          <div className="overflow-x-auto border rounded-md shadow-sm">
            {/* Add the max-height and vertical scroll */}
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader className="bg-gray-100 text-gray-700 text-sm">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>PDF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id} className="text-sm">
                      <TableCell>{doc.id}</TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.email}</TableCell>
                      <TableCell>{doc.company}</TableCell>
                      <TableCell>{doc.phoneNumber || "N/A"}</TableCell>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell className="max-w-sm truncate">
                        {doc.description}
                      </TableCell>
                      <TableCell>
                        {new Date(doc.uploadedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View PDF
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No documents available. Click “Get Data” to load.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
