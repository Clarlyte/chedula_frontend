import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Metadata } from "next"
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services & Equipment - Chedula",
  description: "Manage your services and equipment",
};

export default function ServicesPage() {
  return (
    <section className="mt-5 mb-5 responsive-container relative overflow-hidden">
      <div className="responsive-container relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-gold-400 text-balance">Services & Equipment</h1>
            <p className="text-muted-foreground text-balance">Manage your services, equipment, and packages</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard/services/new" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="gold-gradient hover:opacity-90 transition-opacity w-full"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Service
              </Button>
            </Link>
            <Link href="/dashboard/equipment/new" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 w-full"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Equipment
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 flex-shrink-0 w-full sm:w-auto">
            All
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 flex-shrink-0 w-full sm:w-auto">
            Services
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 flex-shrink-0 w-full sm:w-auto">
            Equipment
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 flex-shrink-0 w-full sm:w-auto">
            Packages
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500/50 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search services or equipment..."
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

        {/* Services/Equipment List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card */}
          <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 text-balance">Haircut & Styling</h3>
                  <p className="text-gold-500/70 text-balance">Service</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white flex-shrink-0">
                  Active
                </span>
              </div>
              <p className="text-gold-500/70 mb-4 text-balance">Professional haircut and styling service with premium products.</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-gold-400 font-semibold text-balance">₱500</span>
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 w-full sm:w-auto">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400 w-full sm:w-auto">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Card */}
          <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 text-balance">Professional Camera Kit</h3>
                  <p className="text-gold-500/70 text-balance">Equipment</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white flex-shrink-0">
                  Available
                </span>
              </div>
              <p className="text-gold-500/70 mb-4 text-balance">Complete camera kit with lenses and accessories.</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-gold-400 font-semibold text-balance">₱2,000/day</span>
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 w-full sm:w-auto">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400 w-full sm:w-auto">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Package Card */}
          <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400 text-balance">Wedding Package</h3>
                  <p className="text-gold-500/70 text-balance">Package</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white flex-shrink-0">
                  Active
                </span>
              </div>
              <p className="text-gold-500/70 mb-4 text-balance">Complete wedding photography package with equipment.</p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-gold-400 font-semibold text-balance">₱15,000</span>
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 w-full sm:w-auto">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400 w-full sm:w-auto">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 