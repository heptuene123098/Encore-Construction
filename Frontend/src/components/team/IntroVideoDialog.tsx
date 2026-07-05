import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Video } from "lucide-react";
import type { TeamMember } from "@/data/team";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
};

const IntroVideoDialog = ({ open, onOpenChange, member }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 overflow-hidden bg-primary border-gold/20">
        <DialogTitle className="sr-only">{member.name} intro video</DialogTitle>
        <div className="aspect-[9/16] w-full bg-primary flex items-center justify-center">
          {member.introVideo ? (
            <video
              src={member.introVideo}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center px-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-xl text-primary-foreground mb-2">
                Intro video coming soon
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {member.name} is filming a 15-second on-site introduction. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntroVideoDialog;
