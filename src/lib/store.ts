import { create } from 'zustand';

export interface Package {
  id: number;
  title: string;
  destination: string;
  duration: string;
  price: number;
  status: 'active' | 'draft' | 'inactive';
  bookings: number;
  image: string;
  description?: string;
  itinerary?: string;
  videos?: string[];
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  package: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  date: string;
}

export interface Payment {
  id: number;
  customerName: string;
  packageTitle: string;
  amount: number;
  date: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'editor';
  status: 'active' | 'inactive';
  lastActive: string;
  avatar?: string;
}

interface AppState {
  packages: Package[];
  enquiries: Enquiry[];
  payments: Payment[];
  users: User[];

  addPackage: (pkg: Omit<Package, 'id' | 'bookings'>) => void;
  updatePackage: (id: number, pkg: Partial<Package>) => void;
  deletePackage: (id: number) => void;

  addEnquiry: (enquiry: Omit<Enquiry, 'id'>) => void;
  updateEnquiryStatus: (id: number, status: Enquiry['status']) => void;

  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePaymentStatus: (id: number, status: Payment['status']) => void;

  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
}

export const useStore = create<AppState>((set) => ({
  packages: [
    {
      id: 1,
      title: "Desert Safari Adventure",
      destination: "Jaisalmer, Rajasthan",
      duration: "4 Days / 3 Nights",
      price: 45000,
      status: "active",
      bookings: 24,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      description: "Experience the magic of the Thar Desert with our comprehensive safari package.",
    },
    {
      id: 2,
      title: "Oasis Retreat Tour",
      destination: "Udaipur, Rajasthan",
      duration: "5 Days / 4 Nights",
      price: 62000,
      status: "active",
      bookings: 18,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
      description: "Relax in the City of Lakes with a luxurious stay and guided tours.",
    },
    {
      id: 3,
      title: "Night Sky Experience",
      destination: "Sam Sand Dunes",
      duration: "2 Days / 1 Night",
      price: 18000,
      status: "active",
      bookings: 45,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      description: "Stargazing in the clear desert sky, a once in a lifetime experience.",
    },
    {
      id: 4,
      title: "Cultural Heritage Tour",
      destination: "Jodhpur & Jaipur",
      duration: "7 Days / 6 Nights",
      price: 85000,
      status: "draft",
      bookings: 0,
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&h=300&fit=crop",
      description: "Explore the rich history and architecture of the Blue and Pink cities.",
    },
    {
      id: 5,
      title: "Camel Trek Expedition",
      destination: "Pushkar, Rajasthan",
      duration: "3 Days / 2 Nights",
      price: 28000,
      status: "inactive",
      bookings: 12,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
      description: "Traditional camel trek through the rustic landscapes of Pushkar.",
    }
  ],
  enquiries: [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      package: "Desert Safari Adventure",
      status: "new",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      package: "Oasis Retreat Tour",
      status: "contacted",
      date: "5 hours ago",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john@example.com",
      package: "Night Sky Experience",
      status: "converted",
      date: "1 day ago",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria@example.com",
      package: "Cultural Heritage Tour",
      status: "rejected",
      date: "2 days ago",
    },
  ],
  payments: [],
  users: [
    {
      id: 1,
      name: "Arjun Mehta",
      email: "arjun@saharajourneys.com",
      role: "admin",
      status: "active",
      lastActive: "Now",
      avatar: "/avatars/arjun.png",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@saharajourneys.com",
      role: "manager",
      status: "active",
      lastActive: "2 hours ago",
      avatar: "/avatars/priya.png",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@saharajourneys.com",
      role: "editor",
      status: "inactive",
      lastActive: "5 days ago",
      avatar: "/avatars/rahul.png",
    },
  ],

  addPackage: (pkg) => set((state) => ({
    packages: [...state.packages, { ...pkg, id: Date.now(), bookings: 0 }]
  })),

  updatePackage: (id, pkg) => set((state) => ({
    packages: state.packages.map((p) => (p.id === id ? { ...p, ...pkg } : p))
  })),

  deletePackage: (id) => set((state) => ({
    packages: state.packages.filter((p) => p.id !== id)
  })),

  addEnquiry: (enquiry) => set((state) => ({
    enquiries: [...state.enquiries, { ...enquiry, id: Date.now() }]
  })),

  updateEnquiryStatus: (id, status) => set((state) => ({
    enquiries: state.enquiries.map((e) => (e.id === id ? { ...e, status } : e))
  })),

  addPayment: (payment) => set((state) => ({
    payments: [...state.payments, { ...payment, id: Date.now() }]
  })),

  updatePaymentStatus: (id, status) => set((state) => ({
    payments: state.payments.map((p) => (p.id === id ? { ...p, status } : p))
  })),

  addUser: (user) => set((state) => ({
    users: [...state.users, { ...user, id: Date.now() }]
  })),

  updateUser: (id, user) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u))
  })),

  deleteUser: (id) => set((state) => ({
    users: state.users.filter((u) => u.id !== id)
  })),
}));
