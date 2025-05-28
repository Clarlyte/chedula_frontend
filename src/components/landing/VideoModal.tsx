import { Dialog, DialogContent } from "@/components/ui/dialog"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 bg-black">
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          src="/demo/tutorial.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  )
} 