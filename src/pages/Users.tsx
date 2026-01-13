import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Clock,
  Trash2,
  Edit,
  User as UserIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore, User } from "@/lib/store";
import { toast } from "sonner";

export default function Users() {
  const { users, addUser, deleteUser, updateUser } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "editor",
    status: "active",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    addUser({
      name: formData.name!,
      email: formData.email!,
      role: formData.role as any,
      status: formData.status as any,
      lastActive: "Just now",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name!)}&background=random`,
    });

    toast.success("User added successfully");
    setIsAddOpen(false);
    setFormData({ name: "", email: "", role: "editor", status: "active" });
  };

  const handleEditUser = () => {
    if (!selectedUser || !formData.name || !formData.email) return;

    updateUser(selectedUser.id, {
      name: formData.name,
      email: formData.email,
      role: formData.role as any,
      status: formData.status as any,
    });

    toast.success("User updated successfully");
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      toast.success("User deleted successfully");
    }
  };

  const roleColors = {
    admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    manager: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    editor: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage admin access and permissions
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg hover:shadow-primary/20">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="premium-card border-white/10 text-foreground">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="John Doe"
                  className="input-dark"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input
                  placeholder="john@example.com"
                  className="input-dark"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(v: any) => setFormData({ ...formData, role: v })}
                  >
                    <SelectTrigger className="input-dark">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(v: any) => setFormData({ ...formData, status: v })}
                  >
                    <SelectTrigger className="input-dark">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleAddUser} className="bg-gradient-gold text-primary-foreground">Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="premium-card border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                className="input-dark"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                className="input-dark"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v: any) => setFormData({ ...formData, role: v })}
                >
                  <SelectTrigger className="input-dark">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v: any) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger className="input-dark">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser} className="bg-gradient-gold text-primary-foreground">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="premium-card p-4 mb-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10 input-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="premium-card p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30"
          >
            {/* Avatar & Info */}
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{user.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </div>
              </div>
            </div>

            {/* Use Details */}
            <div className="flex flex-wrap items-center gap-6 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
              <div className="flex items-center gap-2 min-w-[100px]">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className={`capitalize ${roleColors[user.role]}`}>
                  {user.role}
                </Badge>
              </div>

              <div className="flex items-center gap-2 min-w-[100px]">
                {user.status === 'active' ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={`text-sm capitalize ${user.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}>
                  {user.status}
                </span>
              </div>

              <div className="flex items-center gap-2 min-w-[120px] text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {user.lastActive}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="premium-card border-white/10">
                  <DropdownMenuItem onClick={() => openEditModal(user)} className="gap-2">
                    <Edit className="w-4 h-4" /> Edit User
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(user.id)} className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" /> Delete User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No users found matching "{searchTerm}"
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
