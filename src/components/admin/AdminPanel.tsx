
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

// interface Contact {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
//   requirements: string;
//   date: string;
// }

// const dummyData: Contact[] = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   name: `User ${i + 1}`,
//   email: `user${i + 1}@example.com`,
//   company: `Company ${i + 1}`,
//   requirements: `Project requirement description ${i + 1}`,
//   date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
// }));

// interface AdminPanelProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl">
//         <DialogHeader>
//           <DialogTitle>Contact Form Submissions</DialogTitle>
//         </DialogHeader>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Requirements</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {dummyData.map((contact) => (
//                 <TableRow key={contact.id}>
//                   <TableCell>{contact.date}</TableCell>
//                   <TableCell>{contact.name}</TableCell>
//                   <TableCell>{contact.email}</TableCell>
//                   <TableCell>{contact.company}</TableCell>
//                   <TableCell className="max-w-xs truncate">{contact.requirements}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AdminPanel;
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

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  requirements: string;
  date: string;
}

const dummyData: Contact[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  company: `Company ${i + 1}`,
  requirements: `Project requirement description ${i + 1}`,
  date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
}));

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const AdminPanel = ({ isOpen, onClose, onLogout }: AdminPanelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              🗂️ Contact Submissions
            </DialogTitle>
          </DialogHeader>
          <Button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded"
          >
            Logout
          </Button>
        </div>

        <div className="overflow-x-auto border rounded-md shadow-sm">
          <Table>
            <TableHeader className="bg-gray-100 text-gray-700 text-sm">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.map((contact) => (
                <TableRow
                  key={contact.id}
                  className="hover:bg-gray-50 transition-colors text-sm"
                >
                  <TableCell>{contact.date}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {contact.requirements}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
