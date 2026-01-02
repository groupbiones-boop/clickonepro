import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryCleaning from "@/assets/industry-cleaning.jpg";


export interface TranscriptMessage {
  speaker: "ai" | "client";
  text: string;
  timestamp: number; // seconds
}

export interface AudioDemo {
  id: string;
  title: string;
  image: string;
  audioUrl: string;
  transcript: TranscriptMessage[];
}

export const audioDemos: AudioDemo[] = [
  {
    id: "plumbing",
    title: "Plumbing",
    image: industryPlumbing,
    audioUrl: "/audio/plumbing-demo.m4a",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Mountain View Plumbing. How may I help you?", timestamp: 1 },
      { speaker: "client", text: "Hi, I just wanted to take a shower before work and realized I have no hot water. I think my water heater stopped working. I bought it from you guys five years ago, so I'm hoping it's still under warranty.", timestamp: 6 },
      { speaker: "ai", text: "I'm sorry to hear that. No hot water is never a great way to start the day. Thankfully, if your water heater is only five years old, it should still be under warranty. Just a few quick questions so I can help get the right technician to you as quickly as possible.", timestamp: 16 },
      { speaker: "ai", text: "Are you the homeowner or the person responsible for the property?", timestamp: 30 },
      { speaker: "client", text: "Yes, it's my house.", timestamp: 34 },
      { speaker: "ai", text: "Great. Do you have easy access to where the water heater is located?", timestamp: 37 },
      { speaker: "client", text: "Yeah, it's in my basement.", timestamp: 41 },
      { speaker: "ai", text: "Do you know the brand of your hot water heater?", timestamp: 43 },
      { speaker: "client", text: "Yeah, it's a Rheem.", timestamp: 47 },
      { speaker: "ai", text: "Could you tell me the model name of the unit? That will help us bring the right parts.", timestamp: 49 },
      { speaker: "client", text: "Yeah, it's labeled Rheem Performance Platinum.", timestamp: 55 },
      { speaker: "ai", text: "Rheem Performance Platinum. Noted. Thank you. Can I get your full name, please?", timestamp: 58 },
      { speaker: "client", text: "It's Ryan Whitmore.", timestamp: 63 },
      { speaker: "ai", text: "Thanks, Ryan. Is the number you're calling from 510-738-2146 the best way to reach you?", timestamp: 68 },
      { speaker: "client", text: "Yes.", timestamp: 76 },
      { speaker: "client", text: "One question. Do you guys charge extra for same-day appointments?", timestamp: 78 },
      { speaker: "ai", text: "Same-day appointments are available at no extra charge during normal business hours 9 to 5. If after-hour service is required, you will be notified of additional fees before scheduling.", timestamp: 84 },
      { speaker: "client", text: "Great. How long do these diagnostics usually take? I'll need to notify my boss at work.", timestamp: 89 },
      { speaker: "ai", text: "Most diagnostic appointments take 30 to 60 minutes, depending on the issue. If a full repair is needed, the technician will let you know the estimated time and cost on site.", timestamp: 95 },
      { speaker: "client", text: "Okay, that's fine. Do I need to be home the whole time?", timestamp: 107 },
      { speaker: "ai", text: "We do recommend that someone over the age of 18 is present during the service window.", timestamp: 113 },
      { speaker: "client", text: "Okay, that's no problem.", timestamp: 119 },
      { speaker: "ai", text: "Let me check how soon we could get a technician to you. What is your zip code?", timestamp: 121 },
      { speaker: "client", text: "It's 94544.", timestamp: 129 },
      { speaker: "ai", text: "Great. The earliest we have available is today at 2 p.m. Does that work for you?", timestamp: 131 },
      { speaker: "client", text: "Yeah, let's do 2 p.m.", timestamp: 137 },
      { speaker: "ai", text: "You got it. Finally, what's the street address for your house?", timestamp: 139 },
      { speaker: "client", text: "It's 27468 Mission Hills Drive in Hayward, California.", timestamp: 143 },
      { speaker: "ai", text: "Great. You're all set for 2 p.m. today. A text confirmation will be sent shortly, including the direct phone number for your technician. If anything changes, just give them a call.", timestamp: 148 },
      { speaker: "ai", text: "Thanks again. We'll see you this afternoon.", timestamp: 155 },
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning",
    image: industryCleaning,
    audioUrl: "/audio/cleaning-demo.m4a",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Pure Shine Cleaning. I can tell you more about our services and get your first cleaning scheduled. Where should we start?", timestamp: 0 },
      { speaker: "client", text: "Hi, I wanted to schedule a deep clean for my apartment, but I wanted to ask about pricing first.", timestamp: 6 },
      { speaker: "ai", text: "Our cleaning services are priced at $50 per hour with a two-hour minimum. Each job is staffed by two cleaners. The total cost will depend on the square footage of your apartment and the depth of cleaning required. If you'd like to proceed with scheduling or have more questions, let me know.", timestamp: 12 },
      { speaker: "client", text: "Great, I'd like to proceed.", timestamp: 31 },
      { speaker: "ai", text: "Great, let me gather a few details to get started. Could you tell me the location where you need the service?", timestamp: 32 },
      { speaker: "client", text: "Albany.", timestamp: 40 },
      { speaker: "ai", text: "We require someone to be present to let our crew in. Can someone be on site at your appointment time?", timestamp: 43 },
      { speaker: "client", text: "Yes.", timestamp: 49 },
      { speaker: "ai", text: "Perfect. Any pets must be secured prior to our arrival for the safety of them and our crew. Do you agree to this?", timestamp: 50 },
      { speaker: "client", text: "Yes, that's fine.", timestamp: 55 },
      { speaker: "ai", text: "Could you please provide your full name?", timestamp: 56 },
      { speaker: "client", text: "Dana Murphy.", timestamp: 60 },
      { speaker: "ai", text: "Thanks, Dana. Could you provide your phone number?", timestamp: 63 },
      { speaker: "client", text: "518-555-0123.", timestamp: 67 },
      { speaker: "ai", text: "Got it. That's 518-555-0123. Could you also provide the square footage of the area to be cleaned?", timestamp: 68 },
      { speaker: "client", text: "It's about a thousand square feet.", timestamp: 77 },
      { speaker: "ai", text: "Could you also provide the street address where the cleaning service will take place?", timestamp: 81 },
      { speaker: "client", text: "It's 1425 Washington Square Suite 210 in Albany.", timestamp: 85 },
      { speaker: "ai", text: "Thank you for providing the address. I'm now going to transfer you to a human team member who will schedule an appointment. Please hold for a moment while I connect you.", timestamp: 91 },
      { speaker: "ai", text: "Hi, this is Lisa with Pure Shine Cleaning. I'll be helping you schedule your deep clean today. I'm speaking with Dana Murphy, correct?", timestamp: 101 },
      { speaker: "client", text: "Yes, correct.", timestamp: 107 },
      { speaker: "ai", text: "You have openings on Wednesday at 11 a.m. or Friday at 2:30 p.m. Which time works best for you?", timestamp: 109 },
      { speaker: "client", text: "Friday at 2:30 is good.", timestamp: 117 },
      { speaker: "ai", text: "Great. I'll book you that slot. Give me a few moments.", timestamp: 120 },
      { speaker: "ai", text: "All right, you're all set. You'll get a confirmation text soon and we look forward to cleaning your apartment on Friday afternoon. Thank you for calling and have a great day.", timestamp: 125 },
      { speaker: "client", text: "Thanks. Bye.", timestamp: 135 },
    ],
  },
];

// Helper function to get transcript for audio generation (without timestamps)
export const getTranscriptForGeneration = (demoId: string) => {
  const demo = audioDemos.find(d => d.id === demoId);
  if (!demo) return null;
  
  return demo.transcript.map(msg => ({
    speaker: msg.speaker,
    text: msg.text,
  }));
};
