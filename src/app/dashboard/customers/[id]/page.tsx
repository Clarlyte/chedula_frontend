import React from 'react';
import { ArrowLeft, Calendar, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  // Replace with actual data fetching based on params.id
  const customer = {
    id: params.id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    notes: 'Regular customer.',
    bookings: [
      { id: 1, service: 'Haircut & Styling', date: '2024-03-20', time: '2:00 PM', status: 'Completed' },
      { id: 2, service: 'Camera Rental', date: '2024-03-21', time: '4:00 PM', status: 'Completed' },
      { id: 3, service: 'Wedding Package', date: '2024-03-22', time: '10:00 AM', status: 'Upcoming' },
    ]
  };

  return (
    <section className="responsive-padding relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-background to-background"></div>
      <div className="responsive-container relative z-10">
        {/* Back Button */}
        <Link href="/dashboard/customers" className="inline-flex items-center text-muted-foreground hover:text-gold-400 mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Customers
        </Link>

        {/* Customer Info Card */}
        <div className="bg-background/50 backdrop-blur-sm shadow-lg rounded-lg p-6 mb-6 border border-gold-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gold-400">{customer.firstName} {customer.lastName}</h1>
              <div className="mt-2 flex flex-col sm:flex-row gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gold-400" />
                  {customer.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gold-400" />
                  {customer.phone}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="gold-gradient hover:opacity-90 transition-opacity">
                Edit Customer
              </Button>
            </div>
          </div>
          {customer.notes && (
            <div>
              <h2 className="text-xl font-semibold text-gold-400 mb-2">Notes</h2>
              <p className="text-muted-foreground">{customer.notes}</p>
            </div>
          )}
        </div>

        {/* Booking History */}
        <div className="bg-background/50 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-gold-500/20">
          <h2 className="text-xl font-semibold text-gold-400 mb-4">Booking History</h2>
          <div className="space-y-4">
            {customer.bookings.map((booking) => (
              <div key={booking.id} className="border border-gold-500/20 rounded-lg p-4 hover:bg-gold-500/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium text-gold-400">{booking.service}</h3>
                    <div className="mt-1 flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-gold-400" />
                      <span>{booking.date} - {booking.time}</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 