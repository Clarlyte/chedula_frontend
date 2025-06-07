"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Mail,
  Phone,
  Building,
  User,
  Calendar
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useData } from "@/components/providers/data-provider"
import type { Customer } from "@/lib/api"

export default function CustomersPage() {
  const { user } = useAuth()
  const { customers, customersLoading, refreshCustomers } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "individual" | "business">("all")

  // Filter and search customers
  const filteredCustomers = useMemo(() => {
    let filtered = customers

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(customer => customer.customer_type === filterType)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(customer =>
        customer.first_name?.toLowerCase().includes(query) ||
        customer.last_name?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query) ||
        customer.company?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [customers, searchQuery, filterType])

  // Stats calculation
  const stats = useMemo(() => {
    const total = customers.length
    const individual = customers.filter(c => c.customer_type === 'individual').length
    const business = customers.filter(c => c.customer_type === 'business').length
    const active = customers.filter(c => c.status === 'active').length
    const totalBookings = customers.reduce((sum, c) => sum + (c.total_bookings || 0), 0)

    return { total, individual, business, active, totalBookings }
  }, [customers])

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return "₱0"
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount)
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Please sign in to view customers</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Customers</h1>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 mr-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Total: </span>
                <Badge variant="secondary">{stats.total}</Badge>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Active: </span>
                <Badge variant="secondary">{stats.active}</Badge>
              </div>
            </div>
            
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="space-y-6 h-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Individual</p>
                    <p className="text-lg font-semibold">{stats.individual}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Business</p>
                    <p className="text-lg font-semibold">{stats.business}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bookings</p>
                    <p className="text-lg font-semibold">{stats.totalBookings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-lg font-semibold">{stats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "individual" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("individual")}
              >
                Individual
              </Button>
              <Button
                variant={filterType === "business" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("business")}
              >
                Business
              </Button>
            </div>
          </div>

          {/* Customers Table */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>
                Customer List ({filteredCustomers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customersLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 animate-pulse opacity-50" />
                    <p className="text-muted-foreground">Loading customers...</p>
                  </div>
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      {searchQuery || filterType !== "all" 
                        ? "No customers match your search criteria" 
                        : "No customers yet. Add your first customer or use AI to create them!"
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Last Booking</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {customer.first_name} {customer.last_name}
                              </div>
                              {customer.company && (
                                <div className="text-sm text-muted-foreground">
                                  {customer.company}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={customer.customer_type === 'business' ? 'default' : 'secondary'}>
                              {customer.customer_type || 'individual'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                {customer.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {customer.total_bookings || 0}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatDate(customer.last_booking_date)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {formatCurrency(customer.total_spent)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={customer.status === 'active' ? 'default' : 'secondary'}
                            >
                              {customer.status || 'active'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 