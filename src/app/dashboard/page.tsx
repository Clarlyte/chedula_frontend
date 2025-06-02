export default function DashboardHome() {
  return (
    <div className="flex flex-col space-y-6 p-8 bg-background text-foreground">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to your Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your bookings, customers, and business operations from here.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h3 className="font-semibold">Calendar</h3>
          <p className="text-sm text-muted-foreground">View and manage your bookings</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h3 className="font-semibold">Customers</h3>
          <p className="text-sm text-muted-foreground">Manage your customer base</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h3 className="font-semibold">Services</h3>
          <p className="text-sm text-muted-foreground">Configure your offerings</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground p-6">
          <h3 className="font-semibold">Chat</h3>
          <p className="text-sm text-muted-foreground">Communicate with clients</p>
        </div>
      </div>
    </div>
  );
} 