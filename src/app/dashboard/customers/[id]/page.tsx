import React from 'react';
import { ArrowLeft, Calendar, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/dashboard/customers" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Customers
        </Link>

        {/* Customer Info Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <div className="mt-2 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  john@example.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  +1 234 567 890
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Edit Customer
              </button>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking History</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Haircut & Styling</h3>
                    <div className="mt-1 flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>March {i}, 2024 - 2:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 