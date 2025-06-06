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
    <section className="responsive-padding relative overflow-hidden">
      <div className="responsive-container relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-gold-400">Services & Equipment</h1>
            <p className="text-muted-foreground">Manage your services, equipment, and packages</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/services/new">
              <Button
                size="lg"
                className="gold-gradient hover:opacity-90 transition-opacity"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Service
              </Button>
            </Link>
            <Link href="/dashboard/equipment/new">
              <Button
                size="lg"
                variant="outline"
                className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Equipment
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
            All
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
            Services
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
            Equipment
          </Button>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
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
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10"
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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400">Haircut & Styling</h3>
                  <p className="text-gold-500/70">Service</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                  Active
                </span>
              </div>
              <p className="text-gold-500/70 mb-4">Professional haircut and styling service with premium products.</p>
              <div className="flex justify-between items-center">
                <span className="text-gold-400 font-semibold">₱500</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Card */}
          <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400">Professional Camera Kit</h3>
                  <p className="text-gold-500/70">Equipment</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                  Available
                </span>
              </div>
              <p className="text-gold-500/70 mb-4">Complete camera kit with lenses and accessories.</p>
              <div className="flex justify-between items-center">
                <span className="text-gold-400 font-semibold">₱2,000/day</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Package Card */}
          <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gold-400">Wedding Package</h3>
                  <p className="text-gold-500/70">Package</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                  Active
                </span>
              </div>
              <p className="text-gold-500/70 mb-4">Complete wedding photography package with equipment.</p>
              <div className="flex justify-between items-center">
                <span className="text-gold-400 font-semibold">₱15,000</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500/30 hover:border-red-500/80 hover:bg-red-500/10 text-red-400">
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