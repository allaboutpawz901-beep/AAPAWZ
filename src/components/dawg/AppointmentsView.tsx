'use client';

import React, { useState } from 'react';
import { AppointmentItem } from '@/lib/dawg-types';
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  AlertCircle,
  MoreVertical,
  Scissors
} from 'lucide-react';

interface AppointmentsViewProps {
  appointments: AppointmentItem[];
  onAddAppointment: () => void;
  onUpdateStatus: (id: string, newStatus: AppointmentItem['status']) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  onAddAppointment,
  onUpdateStatus
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = appointments.filter((appt) => {
    const matchesFilter = filterStatus === 'All' || appt.status === filterStatus;
    const matchesSearch = 
      appt.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span>Appointments & Scheduling</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage salon intake, scheduled grooms, active baths, and check-ins for May 12, 2025.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onAddAppointment}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Checked In', 'Scheduled', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white font-semibold shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter pet, breed, service..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Appointments Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Pet & Breed</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Assigned Groomer</th>
                <th className="py-3 px-4">Est. Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{appt.time}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {appt.petEmoji}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{appt.petName}</p>
                        <p className="text-[11px] text-slate-400">{appt.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Scissors className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{appt.serviceName}</span>
                    </div>
                    {appt.notes && (
                      <p className="text-[10px] text-slate-400 mt-0.5 max-w-xs truncate">{appt.notes}</p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {appt.staffName || 'Unassigned'}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ${appt.price?.toFixed(2) || '85.00'}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={appt.status}
                      onChange={(e) => onUpdateStatus(appt.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                        appt.status === 'Checked In'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : appt.status === 'Completed'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : appt.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Checked In">Checked In</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onUpdateStatus(appt.id, appt.status === 'Checked In' ? 'Completed' : 'Checked In')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
                    >
                      {appt.status === 'Checked In' ? 'Finish Groom' : 'Check In'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
