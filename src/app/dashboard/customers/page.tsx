import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Metadata } from "next"
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Customers - Chedula",
  description: "Manage your customers and their bookings",
};

export default function CustomersPage() {
  return (
    <section className="mt-5 mb-5 responsive-container relative overflow-hidden">
      <div className="responsive-container relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-gold-400 text-balance">Customers</h1>
            <p className="text-muted-foreground text-balance">Manage and track your customer information</p>
          </div>
          <Link href="/dashboard/customers/new">
            <Button
              size="lg"
              className="gold-gradient hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              Add Customer
            </Button>
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500/50 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 bg-background/50 border border-gold-500/30 rounded-md focus:ring-gold-500 focus:border-gold-500 text-gold-400 placeholder:text-gold-500/50"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 flex-1 sm:flex-none"
              >
                <Filter className="h-5 w-5 mr-2 text-gold-500/50" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gold-500/20">
              <thead className="bg-gold-500/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/20">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-gold-500/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gold-400">John Doe asd asdasdsasdad</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gold-500/70">john@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gold-500/70">+1 234 567 890</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gold-400 hover:text-gold-300 mr-4">Edit</button>
                      <button className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
} 