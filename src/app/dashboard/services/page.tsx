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
  Settings, 
  Plus, 
  Search, 
  Camera,
  Wrench,
  Package,
  DollarSign,
  Star,
  Activity
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useData } from "@/components/providers/data-provider"
import type { Service } from "@/lib/api"

export default function ServicesPage() {
  const { user } = useAuth()
  const { services, servicesLoading, refreshServices } = useData()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "equipment" | "service" | "package">("all")

  // Filter and search services
  const filteredServices = useMemo(() => {
    let filtered = services

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(service => service.service_type === filterType)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.name?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.brand?.toLowerCase().includes(query) ||
        service.model?.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [services, searchQuery, filterType])

  // Stats calculation
  const stats = useMemo(() => {
    const total = services.length
    const equipment = services.filter(s => s.service_type === 'equipment').length
    const serviceType = services.filter(s => 
      s.service_type === 'consultation' || 
      s.service_type === 'delivery' || 
      s.service_type === 'setup' || 
      s.service_type === 'training' || 
      s.service_type === 'maintenance'
    ).length
    const packages = services.filter(s => s.service_type === 'package').length
    const active = services.filter(s => s.is_active !== false).length
    const totalRevenue = services.reduce((sum, s) => sum + (s.total_revenue || 0), 0)

    return { total, equipment, serviceType, packages, active, totalRevenue }
  }, [services])

  const formatCurrency = (amount?: number) => {
    if (!amount) return "₱0"
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getServiceTypeIcon = (type?: string) => {
    switch (type) {
      case 'equipment':
        return <Camera className="h-4 w-4" />
      case 'consultation':
      case 'service':
        return <Wrench className="h-4 w-4" />
      case 'package':
        return <Package className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getServiceTypeBadge = (type?: string) => {
    switch (type) {
      case 'equipment':
        return <Badge variant="default">Equipment</Badge>
      case 'consultation':
        return <Badge variant="secondary">Consultation</Badge>
      case 'service':
        return <Badge variant="secondary">Service</Badge>
      case 'package':
        return <Badge variant="outline">Package</Badge>
      default:
        return <Badge variant="secondary">Other</Badge>
    }
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">Please sign in to view services</p>
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
            <Settings className="h-5 w-5" />
            <h1 className="text-lg font-semibold">Services & Equipment</h1>
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
              Add Service
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="space-y-6 h-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
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
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Equipment</p>
                    <p className="text-lg font-semibold">{stats.equipment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Services</p>
                    <p className="text-lg font-semibold">{stats.serviceType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Packages</p>
                    <p className="text-lg font-semibold">{stats.packages}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-lg font-semibold">{stats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">{formatCurrency(stats.totalRevenue)}</p>
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
                placeholder="Search services and equipment..."
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
                variant={filterType === "equipment" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("equipment")}
              >
                Equipment
              </Button>
              <Button
                variant={filterType === "service" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("service")}
              >
                Services
              </Button>
              <Button
                variant={filterType === "package" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("package")}
              >
                Packages
              </Button>
            </div>
          </div>

          {/* Services Table */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>
                Services & Equipment ({filteredServices.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto mb-4 animate-pulse opacity-50" />
                    <p className="text-muted-foreground">Loading services...</p>
                  </div>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      {searchQuery || filterType !== "all" 
                        ? "No services match your search criteria" 
                        : "No services yet. Add your first service or equipment, or use AI to create them!"
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
                        <TableHead>Details</TableHead>
                        <TableHead>Pricing</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getServiceTypeIcon(service.service_type)}
                              <div>
                                <div className="font-medium">{service.name}</div>
                                {service.description && (
                                  <div className="text-sm text-muted-foreground max-w-xs truncate">
                                    {service.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getServiceTypeBadge(service.service_type)}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {service.brand && (
                                <div className="text-sm">
                                  <span className="font-medium">Brand:</span> {service.brand}
                                </div>
                              )}
                              {service.model && (
                                <div className="text-sm">
                                  <span className="font-medium">Model:</span> {service.model}
                                </div>
                              )}
                              {service.condition && (
                                <Badge variant="outline" className="text-xs">
                                  {service.condition}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {service.base_price && (
                                <div className="font-medium">
                                  {formatCurrency(service.base_price)}
                                </div>
                              )}
                              {service.price_per_day && (
                                <div className="text-sm text-muted-foreground">
                                  {formatCurrency(service.price_per_day)}/day
                                </div>
                              )}
                              {service.price_per_hour && (
                                <div className="text-sm text-muted-foreground">
                                  {formatCurrency(service.price_per_hour)}/hr
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline">
                                {service.total_bookings || 0}
                              </Badge>
                              {service.average_rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{service.average_rating}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {formatCurrency(service.total_revenue)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={service.is_active !== false ? 'default' : 'secondary'}
                            >
                              {service.is_active !== false ? 'Active' : 'Inactive'}
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