import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar",
  description: "Manage your bookings and schedule",
}

export default function CalendarPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          {/* Calendar view will go here */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Calendar view coming soon...
            </p>
          </div>
        </div>
        <div className="col-span-3">
          {/* Booking details or form will go here */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Booking details coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 