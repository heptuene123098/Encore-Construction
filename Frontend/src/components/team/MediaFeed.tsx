import { useState } from "react";
import { Play, Hash, Camera } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { MediaItem } from "@/data/team";

type Props = {
  mediaFeed: MediaItem[];
  mediaTag: string;
  name: string;
};

const MediaFeed = ({ mediaFeed, mediaTag, name }: Props) => {
  const [active, setActive] = useState<MediaItem | null>(null);
  const featured = mediaFeed.slice(0, 4);

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Curated Feed
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            {name.split(" ")[0]} <span className="text-gold-gradient">in Action</span>
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
            <Hash className="w-4 h-4 text-gold" />
            <span className="font-mono">{mediaTag.replace(/^#/, "")}</span>
          </div>
        </div>

        <Tabs defaultValue="on-the-job" className="w-full">
          <TabsList className="mx-auto mb-8 grid grid-cols-2 max-w-md">
            <TabsTrigger value="on-the-job" className="min-h-[44px]">
              <Camera className="w-4 h-4 mr-2" /> On the Job
            </TabsTrigger>
            <TabsTrigger value="featured" className="min-h-[44px]">
              <Hash className="w-4 h-4 mr-2" /> Featured Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="on-the-job">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFeed.map((item, i) => (
                <MediaTile key={i} item={item} onOpen={() => setActive(item)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((item, i) => (
                <MediaTile key={i} item={item} onOpen={() => setActive(item)} square />
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              Posts from Encore's official channels tagged {mediaTag}.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-primary border-gold/20">
          <DialogTitle className="sr-only">{active?.caption || "Media"}</DialogTitle>
          {active && (
            <div className="bg-primary">
              {active.type === "video" ? (
                <video
                  src={active.src}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] object-contain bg-primary"
                />
              ) : (
                <img
                  src={active.src}
                  alt={active.caption || ""}
                  className="w-full max-h-[80vh] object-contain bg-primary"
                />
              )}
              {(active.caption || active.project) && (
                <div className="p-4 border-t border-gold/20">
                  {active.project && (
                    <div className="text-gold text-xs font-semibold tracking-widest uppercase">
                      {active.project}
                    </div>
                  )}
                  {active.caption && (
                    <p className="text-primary-foreground text-sm mt-1">{active.caption}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

const MediaTile = ({
  item,
  onOpen,
  square,
}: {
  item: MediaItem;
  onOpen: () => void;
  square?: boolean;
}) => (
  <button
    onClick={onOpen}
    className={`group relative overflow-hidden rounded-lg bg-card border border-border shadow-sm ${
      square ? "aspect-square" : "aspect-[4/5]"
    }`}
  >
    <img
      src={item.thumbnail || item.src}
      alt={item.caption || ""}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-90" />
    {item.type === "video" && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center">
          <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
        </div>
      </div>
    )}
    {item.caption && (
      <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
        {item.project && (
          <div className="text-gold text-[10px] font-semibold tracking-widest uppercase truncate">
            {item.project}
          </div>
        )}
        <div className="text-primary-foreground text-xs font-medium truncate">
          {item.caption}
        </div>
      </div>
    )}
  </button>
);

export default MediaFeed;
