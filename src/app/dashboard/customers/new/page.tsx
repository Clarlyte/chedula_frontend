import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NewCustomerPage() {
  return (
    <section className="mt-5 mb-5 responsive-container relative overflow-hidden min-h-screen">
      <div className="responsive-container relative z-10">
        {/* Back Button */}
        <Link href="/dashboard/customers" className="inline-flex items-center text-muted-foreground hover:text-gold-400 mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Customers
        </Link>

        {/* Form */}
        <div className="bg-background/50 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-gold-500/20">
          <h1 className="text-2xl font-bold text-gold-400 mb-6">Add New Customer</h1>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gold-400">
                  First Name
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full rounded-md bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
                  required
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-gold-400">
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full rounded-md bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gold-400">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gold-400">
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-md bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="notes" className="block text-sm font-medium text-gold-400">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                rows={3}
                className="mt-1 block w-full rounded-md bg-background/50 border-gold-500/30 text-gold-400 focus-visible:ring-gold-500/50"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
              <Link
                href="/dashboard/customers"
                passHref
              >
                <Button
                  variant="outline"
                  className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10 w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="gold-gradient hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Save Customer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 