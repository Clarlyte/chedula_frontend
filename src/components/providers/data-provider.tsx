"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"
import { useAuth } from "./auth-provider"
import { customerAPI, serviceAPI, bookingAPI, type Customer, type Service, type Booking, type CalendarEvent } from "@/lib/api"
import { createAIAssistantWebSocket } from "@/lib/websocket"

// Global data state interface
interface DataState {
  // Data
  customers: Customer[]
  services: Service[]
  bookings: Booking[]
  calendarEvents: CalendarEvent[]
  
  // Loading states
  customersLoading: boolean
  servicesLoading: boolean
  bookingsLoading: boolean
  calendarLoading: boolean
  
  // Refresh functions
  refreshCustomers: () => Promise<void>
  refreshServices: () => Promise<void>
  refreshBookings: () => Promise<void>
  refreshCalendar: () => Promise<void>
  refreshAll: () => Promise<void>
  
  // Add/Update functions
  addCustomer: (customer: Customer) => void
  updateCustomer: (customer: Customer) => void
  removeCustomer: (customerId: string) => void
  
  addService: (service: Service) => void
  updateService: (service: Service) => void
  removeService: (serviceId: string) => void
  
  addBooking: (booking: Booking) => void
  updateBooking: (booking: Booking) => void
  removeBooking: (bookingId: string) => void
  
  addCalendarEvent: (event: CalendarEvent) => void
  updateCalendarEvent: (event: CalendarEvent) => void
  removeCalendarEvent: (eventId: string) => void
}

const DataContext = createContext<DataState>({
  customers: [],
  services: [],
  bookings: [],
  calendarEvents: [],
  customersLoading: false,
  servicesLoading: false,
  bookingsLoading: false,
  calendarLoading: false,
  refreshCustomers: async () => {},
  refreshServices: async () => {},
  refreshBookings: async () => {},
  refreshCalendar: async () => {},
  refreshAll: async () => {},
  addCustomer: () => {},
  updateCustomer: () => {},
  removeCustomer: () => {},
  addService: () => {},
  updateService: () => {},
  removeService: () => {},
  addBooking: () => {},
  updateBooking: () => {},
  removeBooking: () => {},
  addCalendarEvent: () => {},
  updateCalendarEvent: () => {},
  removeCalendarEvent: () => {},
})

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user, getToken } = useAuth()
  
  // Data states
  const [customers, setCustomers] = useState<Customer[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  
  // Loading states
  const [customersLoading, setCustomersLoading] = useState(false)
  const [servicesLoading, setServicesLoading] = useState(false)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [calendarLoading, setCalendarLoading] = useState(false)
  
  // WebSocket reference
  const wsRef = useRef<ReturnType<typeof createAIAssistantWebSocket> | null>(null)
  
  // Data fetching functions
  const refreshCustomers = useCallback(async () => {
    if (!user) return
    setCustomersLoading(true)
    try {
      const { data, error } = await customerAPI.getAll()
      if (data && !error) {
        setCustomers(data)
      } else {
        console.error('Failed to fetch customers:', error)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setCustomersLoading(false)
    }
  }, [user])

  const refreshServices = useCallback(async () => {
    if (!user) return
    setServicesLoading(true)
    try {
      const { data, error } = await serviceAPI.getAll()
      if (data && !error) {
        setServices(data)
      } else {
        console.error('Failed to fetch services:', error)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setServicesLoading(false)
    }
  }, [user])

  const refreshBookings = useCallback(async () => {
    if (!user) return
    setBookingsLoading(true)
    try {
      const { data, error } = await bookingAPI.getAll()
      if (data && !error) {
        setBookings(data)
      } else {
        console.error('Failed to fetch bookings:', error)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setBookingsLoading(false)
    }
  }, [user])

  const refreshCalendar = useCallback(async () => {
    if (!user) return
    setCalendarLoading(true)
    try {
      const { data, error } = await bookingAPI.getEvents()
      if (data && !error) {
        setCalendarEvents(data)
      } else {
        console.error('Failed to fetch calendar events:', error)
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error)
    } finally {
      setCalendarLoading(false)
    }
  }, [user])

  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshCustomers(),
      refreshServices(),
      refreshBookings(),
      refreshCalendar()
    ])
  }, [refreshCustomers, refreshServices, refreshBookings, refreshCalendar])

  // Add/Update/Remove functions
  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [...prev, customer])
  }, [])

  const updateCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c))
  }, [])

  const removeCustomer = useCallback((customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId))
  }, [])

  const addService = useCallback((service: Service) => {
    setServices(prev => [...prev, service])
  }, [])

  const updateService = useCallback((service: Service) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s))
  }, [])

  const removeService = useCallback((serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId))
  }, [])

  const addBooking = useCallback((booking: Booking) => {
    setBookings(prev => [...prev, booking])
    // Also refresh calendar to show new booking
    refreshCalendar()
  }, [refreshCalendar])

  const updateBooking = useCallback((booking: Booking) => {
    setBookings(prev => prev.map(b => b.id === booking.id ? booking : b))
    refreshCalendar()
  }, [refreshCalendar])

  const removeBooking = useCallback((bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId))
    refreshCalendar()
  }, [refreshCalendar])

  const addCalendarEvent = useCallback((event: CalendarEvent) => {
    setCalendarEvents(prev => [...prev, event])
  }, [])

  const updateCalendarEvent = useCallback((event: CalendarEvent) => {
    setCalendarEvents(prev => prev.map(e => e.id === event.id ? event : e))
  }, [])

  const removeCalendarEvent = useCallback((eventId: string) => {
    setCalendarEvents(prev => prev.filter(e => e.id !== eventId))
  }, [])

  // Initialize WebSocket for real-time updates
  useEffect(() => {
    if (!user) return

    const initializeWebSocket = async () => {
      try {
        const token = await getToken()
        if (!token) return

        const ws = createAIAssistantWebSocket()
        wsRef.current = ws

        // Set up WebSocket event listeners for real-time updates
        ws.on('connection.established', () => {
          ws.authenticate(token)
        })

        ws.on('authentication.success', () => {
          console.log('Data provider WebSocket authenticated')
        })

        // Listen for AI actions that affect data
        ws.on('ai.action.completed', (action) => {
          console.log('AI action completed:', action)
          
          switch (action.action_type) {
            case 'create_customer':
              if (action.result) {
                addCustomer(action.result)
              }
              break
              
            case 'update_customer':
              if (action.result) {
                updateCustomer(action.result)
              }
              break
              
            case 'create_service':
              if (action.result) {
                addService(action.result)
              }
              refreshServices() // Also refresh to get complete data
              break
              
            case 'update_service':
              if (action.result) {
                updateService(action.result)
              }
              break
              
            case 'create_booking':
              if (action.result) {
                addBooking(action.result)
              }
              // Refresh all booking-related data
              Promise.all([refreshBookings(), refreshCalendar()])
              break
              
            case 'update_booking':
              if (action.result) {
                updateBooking(action.result)
              }
              break
              
            case 'cancel_booking':
              if (action.result?.id) {
                removeBooking(action.result.id)
              }
              break
          }
        })

        // Listen for calendar-specific events
        ws.on('calendar.booking.created', (data) => {
          console.log('Calendar booking created:', data)
          refreshCalendar()
        })

        ws.on('calendar.booking.updated', (data) => {
          console.log('Calendar booking updated:', data)
          refreshCalendar()
        })

        ws.on('calendar.booking.cancelled', (data) => {
          console.log('Calendar booking cancelled:', data)
          refreshCalendar()
        })

        // Connect WebSocket
        await ws.connect()
        
      } catch (error) {
        console.error('Failed to initialize data provider WebSocket:', error)
      }
    }

    initializeWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect()
        wsRef.current = null
      }
    }
  }, [user, getToken, addCustomer, updateCustomer, addService, updateService, addBooking, updateBooking, removeBooking, refreshServices, refreshBookings, refreshCalendar])

  // Initial data load
  useEffect(() => {
    if (user) {
      refreshAll()
    }
  }, [user, refreshAll])

  const value: DataState = {
    customers,
    services,
    bookings,
    calendarEvents,
    customersLoading,
    servicesLoading,
    bookingsLoading,
    calendarLoading,
    refreshCustomers,
    refreshServices,
    refreshBookings,
    refreshCalendar,
    refreshAll,
    addCustomer,
    updateCustomer,
    removeCustomer,
    addService,
    updateService,
    removeService,
    addBooking,
    updateBooking,
    removeBooking,
    addCalendarEvent,
    updateCalendarEvent,
    removeCalendarEvent,
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
} 