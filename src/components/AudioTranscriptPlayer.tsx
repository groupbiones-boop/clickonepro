import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AudioDemo, TranscriptMessage } from "@/data/audioDemo";

interface AudioTranscriptPlayerProps {
  demo: AudioDemo;
}

const AudioTranscriptPlayer = ({ demo }: AudioTranscriptPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<TranscriptMessage[]>([]);

  // Reset when demo changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setVisibleMessages([]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [demo.id]);

  // Update visible messages based on current time
  useEffect(() => {
    const visible = demo.transcript.filter((msg) => msg.timestamp <= currentTime);
    setVisibleMessages(visible);
  }, [currentTime, demo.transcript]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setVisibleMessages([]);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Simulate audio progress for demo (since we don't have real audio files yet)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Get max timestamp from transcript
      const maxTime = Math.max(...demo.transcript.map(m => m.timestamp)) + 5;
      
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, demo.transcript]);

  // Simulated duration based on transcript
  const simulatedDuration = Math.max(...demo.transcript.map(m => m.timestamp)) + 5;
  const displayDuration = duration || simulatedDuration;
  const displayProgress = (currentTime / displayDuration) * 100;

  return (
    <div className="grid md:grid-cols-2 gap-6 bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg">
      {/* Left side - Image and Player */}
      <div className="flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={demo.image}
            alt={demo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              <Bot className="h-4 w-4" />
              {demo.title}
            </span>
          </div>
        </div>
        
        {/* Audio Player Controls */}
        <div className="p-4 bg-muted/50">
          <audio
            ref={audioRef}
            src={demo.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
          
          {/* Progress Bar */}
          <div 
            className="group relative h-2 bg-muted rounded-full cursor-pointer mb-3"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
              style={{ width: `${displayProgress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${displayProgress}% - 8px)` }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="default"
                onClick={togglePlay}
                className={cn(
                  "h-10 w-10 rounded-full",
                  isPlaying && "animate-pulse"
                )}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleReplay}
                className="h-8 w-8"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {formatTime(currentTime)} / {formatTime(displayDuration)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Right side - Transcript */}
      <div className="flex flex-col h-full max-h-[400px] md:max-h-none">
        <div className="p-4 border-b border-border/50">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Transcrição em Tempo Real
          </h4>
        </div>
        
        <div 
          ref={transcriptRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto scroll-smooth"
        >
          {visibleMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Clique em play para iniciar a demonstração
            </div>
          ) : (
            visibleMessages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2 animate-fade-in",
                  msg.speaker === "client" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                    msg.speaker === "ai"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {msg.speaker === "ai" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 rounded-2xl text-sm",
                    msg.speaker === "ai"
                      ? "bg-primary/10 text-foreground rounded-tl-sm"
                      : "bg-muted text-foreground rounded-tr-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioTranscriptPlayer;
