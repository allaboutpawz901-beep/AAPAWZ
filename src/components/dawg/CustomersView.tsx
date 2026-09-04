'use client';

import React, { useState } from 'react';
import { Customer, CustomerFullProfile } from '@/lib/dawg-types';
import { CustomerDetailsView } from './CustomerDetailsView';
import { SARAH_JOHNSON_PROFILE } from '@/lib/dawg-mock-data';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Dog,
  DollarSign,
  Calendar,
  UserCheck,
  ChevronRight,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface CustomersViewProps {
  customers: Customer[];
  onAddCustomer: () => void;
  onOpenNewAppointment?: () => void;
  onOpenAddPet?: () => void;
  onOpenTakePayment?: () => void;
  onOpenIntake?: () => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  customers,
  onAddCustomer,
  onOpenNewAppointment,
  onOpenAddPet,
  onOpenTakePayment,
  onOpenIntake,
}) => {
  // Default view is 'detail' for Sarah Johnson as requested in the mockup
  const [viewMode, setViewMode] = useState<'detail' | 'directory'>('detail');
  const [selectedProfile, setSelectedProfile] = useState<CustomerFullProfile>(SARAH_JOHNSON_PROFILE);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const handleSelectCustomer = (cust: Customer) => {
    // If it's Sarah Johnson, use the rich profile, otherwise generate dynamic profile
    if (cust.name === 'Sarah Johnson' || cust.id === 'cust-1') {
      setSelectedProfile(SARAH_JOHNSON_PROFILE);
    } else {
      setSelectedProfile({
        id: cust.id,
        name: cust.name,
        status: 'Active Customer',
        phone: cust.phone,
        email: cust.email,
        address: '742 Evergreen Terrace, Frisco, TX 75034',
        lifetimeValue: cust.totalSpent + 150,
        totalSpent: cust.totalSpent,
        outstandingBalance: 0.0,
        loyaltyPoints: Math.floor(cust.totalSpent / 5),
        customerSince: 'Jan 15, 2024',
        defaultPaymentMethod: {
          cardBrand: 'VISA',
          last4: '4242',
          expires: '06/27',
        },
        pets: cust.pets.map((p, i) => ({
          id: `pet-${i}`,
          name: p,
          breed: i === 0 ? 'Golden Retriever' : 'Poodle',
          gender: i === 0 ? 'Male' : 'Female',
          age: `${i + 2} yrs`,
          birthDate: 'Mar 14, 2021',
          weight: i === 0 ? '55 lbs' : '22 lbs',
          imageUrl:
            i === 0
              ? 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80'
              : 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80',
          isPrimary: i === 0,
          vaccinationsStatus: 'Up to date',
          medicalAlert: i === 0 ? 'No Known Allergies' : 'Sensitive Skin',
          lastGroomDate: cust.lastVisit,
          nextApptDate: 'Jun 12, 2025',
          nextApptType: 'Full Groom',
        })),
        upcomingAppointments: SARAH_JOHNSON_PROFILE.upcomingAppointments,
        paymentHistory: SARAH_JOHNSON_PROFILE.paymentHistory,
        recentActivity: SARAH_JOHNSON_PROFILE.recentActivity,
        communication: SARAH_JOHNSON_PROFILE.communication,
      });
    }
    setViewMode('detail');
  };

  if (viewMode === 'detail') {
    return (
      <div className="space-y-4">
        {/* Quick Directory Switcher Bar */}
        <div className="px-4 sm:px-8 pt-4 flex items-center justify-between">
          <button
            onClick={() => setViewMode('directory')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>&larr; Switch to All Customers Directory ({customers.length})</span>
          </button>

          <div className="text-[11px] text-slate-400 font-medium">
            Viewing Profile: <strong className="text-slate-700">{selectedProfile.name}</strong>
          </div>
        </div>

        {/* The Exact Spec Customer Details View */}
        <CustomerDetailsView
          customerProfile={selectedProfile}
          onBackToDirectory={() => setViewMode('directory')}
          onOpenNewAppointment={onOpenNewAppointment}
          onOpenAddPet={onOpenAddPet}
          onOpenTakePayment={onOpenTakePayment}
          onOpenIntake={onOpenIntake}
        />
      </div>
    );
  }

  // Directory View
  return (
    <div className="p-4 sm:p-8 space-y-6 ">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>Customer Directory</span>
            </h1>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
              {customers.length} Clients
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Client records, contact info, pet associations, and lifetime spend. Click any card to open full customer profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={onAddCustomer}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            onClick={() => handleSelectCustomer(cust)}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-md transition-all space-y-3.5 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>{cust.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-0.5" />
                </h3>
                <p className="text-[11px] text-indigo-600 font-medium mt-0.5">
                  Prefers: {cust.preferredGroomer}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                ${cust.totalSpent.toFixed(2)} spent
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{cust.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{cust.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last visit: {cust.lastVisit}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {cust.pets.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-[10px] font-medium flex items-center gap-1"
                  >
                    <Dog className="w-3 h-3 text-amber-600" />
                    <span>{p}</span>
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                View Profile &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
