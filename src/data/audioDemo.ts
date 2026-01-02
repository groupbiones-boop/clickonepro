import industryPlumbing from "@/assets/industry-plumbing-new.jpg";
import industryCleaning from "@/assets/industry-cleaning.jpg";
import officeImage from "@/assets/office-tech.jpg";

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
      { speaker: "ai", text: "Thank you for calling Mountain View Plumbing. How may I help you?", timestamp: 0 },
      { speaker: "client", text: "Hi, I just wanted to take a shower before work and realized I have no hot water. I think my water heater stopped working. I bought it from you guys five years ago, so I'm hoping it's still under warranty.", timestamp: 6 },
      { speaker: "ai", text: "I'm sorry to hear that. No hot water is never a great way to start the day. Thankfully, if your water heater is only five years old, it should still be under warranty. Just a few quick questions so I can help get the right technician to you as quickly as possible.", timestamp: 16 },
      { speaker: "ai", text: "Are you the homeowner or the person responsible for the property?", timestamp: 26 },
      { speaker: "client", text: "Yes, it's my house.", timestamp: 32 },
      { speaker: "ai", text: "Great. Do you have easy access to where the water heater is located?", timestamp: 35 },
      { speaker: "client", text: "Yeah, it's in my basement.", timestamp: 40 },
      { speaker: "ai", text: "Do you know the brand of your hot water heater?", timestamp: 43 },
      { speaker: "client", text: "Yeah, it's a Rheem.", timestamp: 46 },
      { speaker: "ai", text: "Could you tell me the model name of the unit? That will help us bring the right parts.", timestamp: 49 },
      { speaker: "client", text: "Yeah, it's labeled Rheem Performance Platinum.", timestamp: 55 },
      { speaker: "ai", text: "Rheem Performance Platinum. Noted. Thank you. Can I get your full name, please?", timestamp: 58 },
      { speaker: "client", text: "It's Ryan Whitmore.", timestamp: 64 },
      { speaker: "ai", text: "Thanks, Ryan. Is the number you're calling from 510-738-2146 the best way to reach you?", timestamp: 68 },
      { speaker: "client", text: "Yes.", timestamp: 76 },
      { speaker: "client", text: "One question. Do you guys charge extra for same-day appointments?", timestamp: 78 },
      { speaker: "ai", text: "Same-day appointments are available at no extra charge during normal business hours 9 to 5. If after-hour service is required, you will be notified of additional fees before scheduling.", timestamp: 82 },
      { speaker: "client", text: "Great. How long do these diagnostics usually take? I'll need to notify my boss at work.", timestamp: 92 },
      { speaker: "ai", text: "Most diagnostic appointments take 30 to 60 minutes, depending on the issue. If a full repair is needed, the technician will let you know the estimated time and cost on site.", timestamp: 98 },
      { speaker: "client", text: "Okay, that's fine. Do I need to be home the whole time?", timestamp: 107 },
      { speaker: "ai", text: "We do recommend that someone over the age of 18 is present during the service window.", timestamp: 113 },
      { speaker: "client", text: "Okay, that's no problem.", timestamp: 120 },
      { speaker: "ai", text: "Let me check how soon we could get a technician to you. What is your zip code?", timestamp: 123 },
      { speaker: "client", text: "It's 94544.", timestamp: 129 },
      { speaker: "ai", text: "Great. The earliest we have available is today at 2 p.m. Does that work for you?", timestamp: 131 },
      { speaker: "client", text: "Yeah, let's do 2 p.m.", timestamp: 138 },
      { speaker: "ai", text: "You got it. Finally, what's the street address for your house?", timestamp: 140 },
      { speaker: "client", text: "It's 27468 Mission Hills Drive in Hayward, California.", timestamp: 145 },
      { speaker: "ai", text: "Great. You're all set for 2 p.m. today. A text confirmation will be sent shortly, including the direct phone number for your technician. If anything changes, just give them a call.", timestamp: 149 },
      { speaker: "ai", text: "Thanks again. We'll see you this afternoon.", timestamp: 158 },
    ],
  },
  {
    id: "law-office",
    title: "Law Office",
    image: officeImage,
    audioUrl: "https://ojyzegzdlpjlbdhvqhav.supabase.co/storage/v1/object/public/demo-audio/law-office.mp3",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Thompson and Associates Law Firm. This is Sarah, your virtual assistant. How may I direct your call today?", timestamp: 0 },
      { speaker: "client", text: "Hi, I need to schedule a consultation. I'm going through a divorce and need legal advice.", timestamp: 9 },
      { speaker: "ai", text: "I'm sorry to hear you're going through this difficult time. I'd be happy to help you schedule a consultation with one of our family law attorneys. Is this your first time contacting our firm?", timestamp: 17 },
      { speaker: "client", text: "Yes, it is. A friend recommended you.", timestamp: 30 },
      { speaker: "ai", text: "We appreciate the referral. Before I schedule your appointment, I have a few questions to help us prepare. Are there any children involved in the marriage?", timestamp: 35 },
      { speaker: "client", text: "Yes, we have two children, ages 8 and 12.", timestamp: 47 },
      { speaker: "ai", text: "I understand. And would you say this is an amicable situation, or do you anticipate there might be some disagreements regarding custody or assets?", timestamp: 53 },
      { speaker: "client", text: "It's... complicated. We haven't agreed on custody yet, and there's a house involved.", timestamp: 65 },
      { speaker: "ai", text: "Thank you for sharing that. Given the complexity of your situation, I'd like to schedule you with Attorney Rebecca Martinez. She specializes in family law with property division. She has availability Thursday at 10:00 AM or Friday at 3:00 PM. Which would work better for you?", timestamp: 73 },
      { speaker: "client", text: "Thursday at 10:00 works for me.", timestamp: 92 },
      { speaker: "ai", text: "Excellent. The initial consultation is 1 hour and there's a $200 consultation fee, which will be credited toward your retainer if you decide to proceed with our firm. Is that okay?", timestamp: 97 },
      { speaker: "client", text: "Yes, that's fine.", timestamp: 113 },
      { speaker: "ai", text: "Perfect. May I have your full name please?", timestamp: 116 },
      { speaker: "client", text: "Jennifer Lawson.", timestamp: 121 },
      { speaker: "ai", text: "Thank you, Jennifer. And your phone number?", timestamp: 124 },
      { speaker: "client", text: "(415) 555-7890.", timestamp: 128 },
      { speaker: "ai", text: "And your email address for confirmation?", timestamp: 133 },
      { speaker: "client", text: "j.lawson@email.com.", timestamp: 137 },
      { speaker: "ai", text: "Perfect. I've scheduled your consultation with Attorney Martinez for Thursday at 10:00 AM. You'll receive a confirmation email with our office address and a list of documents to bring. Is there anything else I can help you with?", timestamp: 141 },
      { speaker: "client", text: "No, that's everything. Thank you for being so helpful.", timestamp: 156 },
      { speaker: "ai", text: "You're welcome, Jennifer. We look forward to meeting you on Thursday. Take care.", timestamp: 162 },
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning",
    image: industryCleaning,
    audioUrl: "/audio/cleaning-demo.m4a",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Sparkle Clean Services. I'm Sarah, your virtual assistant. How can I help you today?", timestamp: 0 },
      { speaker: "client", text: "Hi! I'd like to schedule a deep cleaning for my house.", timestamp: 8 },
      { speaker: "ai", text: "Wonderful! I'd be happy to help you with that. Let me gather some information to give you an accurate quote. First, how many bedrooms and bathrooms does your home have?", timestamp: 13 },
      { speaker: "client", text: "It's a 3 bedroom, 2 bathroom house.", timestamp: 26 },
      { speaker: "ai", text: "Great. And approximately how many square feet is the home?", timestamp: 31 },
      { speaker: "client", text: "It's about 1,800 square feet.", timestamp: 37 },
      { speaker: "ai", text: "Perfect. Do you have any pets? This helps us plan for any additional cleaning needs.", timestamp: 42 },
      { speaker: "client", text: "Yes, I have a golden retriever. There's quite a bit of dog hair around.", timestamp: 50 },
      { speaker: "ai", text: "No problem! We're experienced with pet-friendly homes. Are there any specific areas you'd like us to focus on, or any areas that need extra attention?", timestamp: 58 },
      { speaker: "client", text: "The kitchen definitely needs extra attention. I haven't had time to deep clean the oven and refrigerator in a while.", timestamp: 70 },
      { speaker: "ai", text: "Understood. We'll make sure to include those in the deep clean. Based on your home size and requirements, a deep cleaning would take approximately 4 to 5 hours and would cost $320. Does that work for you?", timestamp: 80 },
      { speaker: "client", text: "Yes, that sounds reasonable.", timestamp: 96 },
      { speaker: "ai", text: "Excellent! Let me check our schedule. We have availability this Saturday morning at 9:00 AM, or next Monday at 1:00 PM. Which would you prefer?", timestamp: 100 },
      { speaker: "client", text: "Saturday morning works perfectly for me.", timestamp: 112 },
      { speaker: "ai", text: "Great choice! Can I get your full name?", timestamp: 117 },
      { speaker: "client", text: "It's Amanda Richards.", timestamp: 121 },
      { speaker: "ai", text: "And your address, Amanda?", timestamp: 125 },
      { speaker: "client", text: "456 Maple Drive.", timestamp: 128 },
      { speaker: "ai", text: "Perfect. And a phone number where we can reach you?", timestamp: 132 },
      { speaker: "client", text: "(858) 555-2345.", timestamp: 136 },
      { speaker: "ai", text: "Wonderful. You're all set for Saturday at 9:00 AM. Our team will arrive with all necessary supplies and equipment. We'll send you a confirmation text with the details. Is there anything else I can help you with?", timestamp: 141 },
      { speaker: "client", text: "No, that's perfect. Thank you so much!", timestamp: 156 },
      { speaker: "ai", text: "You're welcome, Amanda! We look forward to making your home sparkle. Have a great day!", timestamp: 160 },
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
