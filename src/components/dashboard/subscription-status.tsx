'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Icons } from '@/components/icons'
import { subscriptionService } from '@/lib/api'

interface SubscriptionData {
  subscription_tier: string
  trial_start_date: string | null
  trial_end_date: string | null
  trial_extensions_used: number
  trial_extensions_remaining: number
  days_remaining: number
  is_trial_active: boolean
  is_trial_expired: boolean
  can_extend_trial: boolean
}

interface UsageData {
  bookings_this_month: number
  bookings_limit: number
  storage_used_mb: number
  storage_limit_mb: number
  ai_requests_this_month: number
  ai_requests_limit: number
}

export function SubscriptionStatus() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null)
  const [usageData, setUsageData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [extending, setExtending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSubscriptionData()
  }, [])

  const loadSubscriptionData = async () => {
    try {
      setLoading(true)
      const [subscriptionResponse, usageResponse] = await Promise.all([
        subscriptionService.getStatus(),
        subscriptionService.getUsage(),
      ])

      if (subscriptionResponse.error) {
        throw new Error(subscriptionResponse.error.message || 'Failed to load subscription data')
      }

      if (usageResponse.error) {
        throw new Error(usageResponse.error.message || 'Failed to load usage data')
      }

      setSubscriptionData(subscriptionResponse.data)
      setUsageData(usageResponse.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleExtendTrial = async () => {
    try {
      setExtending(true)
      const { data, error } = await subscriptionService.extendTrial(
        'User requested trial extension from dashboard'
      )

      if (error) {
        throw new Error(error.message || 'Failed to extend trial')
      }

      // Reload subscription data
      await loadSubscriptionData()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setExtending(false)
    }
  }

  const getSubscriptionBadge = (tier: string) => {
    const variants: Record<string, any> = {
      freemium: { variant: 'secondary', label: 'Free' },
      basic: { variant: 'default', label: 'Basic' },
      professional: { variant: 'default', label: 'Professional' },
      enterprise: { variant: 'default', label: 'Enterprise' },
    }
    
    const config = variants[tier] || variants.freemium
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getTrialStatusBadge = () => {
    if (!subscriptionData) return null

    if (subscriptionData.is_trial_active) {
      return <Badge className="bg-green-100 text-green-800">Trial Active</Badge>
    } else if (subscriptionData.is_trial_expired) {
      return <Badge variant="destructive">Trial Expired</Badge>
    } else {
      return <Badge variant="outline">No Trial</Badge>
    }
  }

  const formatDaysRemaining = (days: number) => {
    if (days > 1) {
      return `${days} days remaining`
    } else if (days === 1) {
      return '1 day remaining'
    } else if (days === 0) {
      return 'Expires today'
    } else {
      return 'Expired'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Icons.spinner className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600 text-sm">{error}</div>
          <Button onClick={loadSubscriptionData} className="mt-2" size="sm">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!subscriptionData || !usageData) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Subscription Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Subscription Status
            {getSubscriptionBadge(subscriptionData.subscription_tier)}
          </CardTitle>
          <CardDescription>
            Your current plan and trial information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriptionData.is_trial_active && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trial Status</span>
                {getTrialStatusBadge()}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDaysRemaining(subscriptionData.days_remaining)}
              </div>
              <Progress 
                value={(7 - subscriptionData.days_remaining) / 7 * 100} 
                className="h-2"
              />
              {subscriptionData.can_extend_trial && (
                <div className="pt-2">
                  <Button 
                    onClick={handleExtendTrial} 
                    disabled={extending}
                    size="sm"
                    variant="outline"
                  >
                    {extending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Extend Trial ({subscriptionData.trial_extensions_remaining} left)
                  </Button>
                </div>
              )}
            </div>
          )}

          {subscriptionData.is_trial_expired && (
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm text-yellow-800">
                Your trial has expired. Upgrade to continue using all features.
              </p>
              <Button className="mt-2" size="sm">
                Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>
            Your current usage for this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bookings Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Bookings</span>
              <span>
                {usageData.bookings_this_month} / {usageData.bookings_limit === -1 ? '∞' : usageData.bookings_limit}
              </span>
            </div>
            {usageData.bookings_limit !== -1 && (
              <Progress 
                value={(usageData.bookings_this_month / usageData.bookings_limit) * 100} 
                className="h-2"
              />
            )}
          </div>

          {/* Storage Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Storage</span>
              <span>
                {(usageData.storage_used_mb / 1024).toFixed(1)} GB / {(usageData.storage_limit_mb / 1024).toFixed(1)} GB
              </span>
            </div>
            <Progress 
              value={(usageData.storage_used_mb / usageData.storage_limit_mb) * 100} 
              className="h-2"
            />
          </div>

          {/* AI Requests Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>AI Requests</span>
              <span>
                {usageData.ai_requests_this_month} / {usageData.ai_requests_limit === -1 ? '∞' : usageData.ai_requests_limit}
              </span>
            </div>
            {usageData.ai_requests_limit !== -1 && (
              <Progress 
                value={(usageData.ai_requests_this_month / usageData.ai_requests_limit) * 100} 
                className="h-2"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 