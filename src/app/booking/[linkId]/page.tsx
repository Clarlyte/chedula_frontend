import { Metadata } from "next"
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface BookingPageProps {
  params: {
    linkId: string
  }
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies })
  const { data: bookingLink } = await supabase
    .from("booking_links")
    .select("business_name")
    .eq("id", params.linkId)
    .single()

  if (!bookingLink) {
    return {
      title: "Booking Not Found",
      description: "The requested booking page could not be found",
    }
  }

  return {
    title: `Book with ${bookingLink.business_name}`,
    description: `Schedule your appointment with ${bookingLink.business_name}`,
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: bookingLink } = await supabase
    .from("booking_links")
    .select("*")
    .eq("id", params.linkId)
    .single()

  if (!bookingLink) {
    notFound()
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Book with {bookingLink.business_name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Select a service and time to book your appointment
          </p>
        </div>
        {/* Booking form will go here */}
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">
            Booking form coming soon...
          </p>
        </div>
      </div>
    </div>
  )
} 