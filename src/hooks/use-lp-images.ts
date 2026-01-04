import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface LPImage {
  section: string;
  url: string | null;
}

const LP_IMAGE_SECTIONS = [
  "lp-hero.png",
  "lp-hook-phone.png",
  "lp-daily-worker.png",
  "lp-problem-stats.png",
  "lp-why-overwhelmed.png",
  "lp-solution-ai.png",
  "lp-how-works.png",
  "lp-success.png"
];

export function useLPImages() {
  const [images, setImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const { data: files } = await supabase.storage
          .from("lp-images")
          .list();

        if (files) {
          const imageMap: Record<string, string> = {};
          
          for (const file of files) {
            if (LP_IMAGE_SECTIONS.includes(file.name)) {
              const { data } = supabase.storage
                .from("lp-images")
                .getPublicUrl(file.name);
              
              // Extract section name from filename (e.g., "lp-hero.png" -> "hero")
              const sectionName = file.name.replace("lp-", "").replace(".png", "");
              imageMap[sectionName] = data.publicUrl + `?t=${file.updated_at}`;
            }
          }
          
          setImages(imageMap);
        }
      } catch (error) {
        console.error("Error loading LP images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  return { images, isLoading };
}
