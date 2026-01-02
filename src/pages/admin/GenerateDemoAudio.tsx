import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Volume2, Check, AlertCircle } from "lucide-react";
import { audioDemos, getTranscriptForGeneration } from "@/data/audioDemo";

interface GenerationStatus {
  [key: string]: "idle" | "generating" | "success" | "error";
}

interface GeneratedUrls {
  [key: string]: string;
}

const GenerateDemoAudio = () => {
  const [status, setStatus] = useState<GenerationStatus>({});
  const [generatedUrls, setGeneratedUrls] = useState<GeneratedUrls>({});

  const generateAudio = async (demoId: string) => {
    const transcript = getTranscriptForGeneration(demoId);
    if (!transcript) {
      toast.error("Demo not found");
      return;
    }

    setStatus(prev => ({ ...prev, [demoId]: "generating" }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-demo-audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ demoId, transcript }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate audio");
      }

      const data = await response.json();
      
      setStatus(prev => ({ ...prev, [demoId]: "success" }));
      setGeneratedUrls(prev => ({ ...prev, [demoId]: data.url }));
      
      toast.success(`Audio generated for ${demoId}!`, {
        description: `Size: ${(data.size / 1024 / 1024).toFixed(2)} MB`,
      });
    } catch (error) {
      console.error("Error generating audio:", error);
      setStatus(prev => ({ ...prev, [demoId]: "error" }));
      toast.error("Failed to generate audio", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const generateAll = async () => {
    for (const demo of audioDemos) {
      await generateAudio(demo.id);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Generate Demo Audio</h1>
          <p className="text-muted-foreground">
            Generate realistic AI receptionist audio demos using ElevenLabs text-to-speech.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Batch Generation</CardTitle>
            <CardDescription>
              Generate all demo audio files at once. This may take several minutes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={generateAll} size="lg">
              <Volume2 className="mr-2 h-5 w-5" />
              Generate All Demos
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {audioDemos.map((demo) => (
            <Card key={demo.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {demo.title}
                  {status[demo.id] === "success" && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                  {status[demo.id] === "error" && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                </CardTitle>
                <CardDescription>
                  {demo.transcript.length} messages • ~{Math.ceil(Math.max(...demo.transcript.map(m => m.timestamp)) / 60)} min
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => generateAudio(demo.id)}
                    disabled={status[demo.id] === "generating"}
                    variant={status[demo.id] === "success" ? "outline" : "default"}
                  >
                    {status[demo.id] === "generating" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : status[demo.id] === "success" ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Regenerate
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Generate Audio
                      </>
                    )}
                  </Button>

                  {generatedUrls[demo.id] && (
                    <div className="flex items-center gap-2">
                      <audio controls src={generatedUrls[demo.id]} className="h-10" />
                      <a
                        href={generatedUrls[demo.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  )}
                </div>

                {generatedUrls[demo.id] && (
                  <div className="mt-3 p-2 bg-muted rounded text-xs font-mono break-all">
                    {generatedUrls[demo.id]}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1. Click "Generate Audio" for each demo to create the audio file.</p>
            <p>2. The audio will be uploaded to Supabase Storage.</p>
            <p>3. Copy the generated URL and update the `audioUrl` in `src/data/audioDemo.ts`.</p>
            <p>4. Each demo takes about 1-2 minutes to generate due to API rate limits.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateDemoAudio;
