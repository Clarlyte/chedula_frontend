"use client"

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import './calendar.css';

const CalendarPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setIsBookingModalOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    // Handle event click (view/edit booking)
    console.log('Event clicked:', clickInfo.event);
  };

  return (
    <section className="responsive-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-background to-background"></div>
      <div className="responsive-container relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-gold-400">Calendar</h1>
            <p className="text-muted-foreground">Manage your bookings and appointments</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings or events..."
              className="w-full pl-9 bg-background/50 border-gold-500/30 focus-visible:ring-gold-500/50"
            />
          </div>
          <Button variant="outline" className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Calendar */}
        <div className="bg-background/50 backdrop-blur-sm border border-gold-500/20 shadow-lg rounded-lg p-4">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              events={[
                {
                  title: 'Haircut Appointment',
                  start: '2024-03-20T10:00:00',
                  end: '2024-03-20T11:00:00',
                  backgroundColor: '#EAB308',
                  borderColor: '#EAB308'
                },
                {
                  title: 'Camera Rental',
                  start: '2024-03-21T14:00:00',
                  end: '2024-03-21T16:00:00',
                  backgroundColor: '#10B981',
                  borderColor: '#10B981'
                }
              ]}
              select={handleDateSelect}
              eventClick={handleEventClick}
              height="auto"
            />
          </div>
        </div>

        {/* Booking Modal */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-gold-400">Create New Booking</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right text-gold-400">
                  Date
                </Label>
                <Input
                  id="date"
                  value={selectedDate?.toLocaleDateString()}
                  className="col-span-3 bg-background/50 border-gold-500/30 text-gold-400"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service" className="text-right text-gold-400">
                  Service
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 bg-background/50 border-gold-500/30 text-gold-400">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="haircut">Haircut & Styling</SelectItem>
                    <SelectItem value="camera">Camera Rental</SelectItem>
                    <SelectItem value="package">Wedding Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right text-gold-400">
                  Customer
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 bg-background/50 border-gold-500/30 text-gold-400">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="jane">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right text-gold-400">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="col-span-3 bg-background/50 border-gold-500/30 text-gold-400"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-gold-500/30 hover:border-gold-500/80 hover:bg-gold-500/10"
                onClick={() => setIsBookingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="gold-gradient hover:opacity-90 transition-opacity"
                onClick={() => setIsBookingModalOpen(false)}
              >
                Create Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CalendarPage; 