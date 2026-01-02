import industryPlumbing from "@/assets/industry-plumbing.jpg";
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
    audioUrl: "",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Plumber Pro Services. My name is Sarah, I'm your virtual assistant. How may I help you today?", timestamp: 0 },
      { speaker: "client", text: "Hi, I have a pretty bad leak under my kitchen sink and I need someone to come fix it as soon as possible.", timestamp: 6 },
      { speaker: "ai", text: "I'm sorry to hear about the leak. I can definitely help you get that taken care of. Can you tell me, is the water actively leaking right now, or has it stopped?", timestamp: 12 },
      { speaker: "client", text: "It's still dripping pretty steadily. I've put a bucket under it, but it's filling up fast.", timestamp: 20 },
      { speaker: "ai", text: "Okay, that sounds like it needs attention right away. Have you been able to locate your water shut-off valve? Turning it off might help slow the leak until our technician arrives.", timestamp: 26 },
      { speaker: "client", text: "Yeah, I found it and turned it off. The dripping has slowed down a lot now.", timestamp: 35 },
      { speaker: "ai", text: "Perfect, that was smart thinking. Now, let me check our schedule for the earliest available appointment. Can I have your zip code please?", timestamp: 40 },
      { speaker: "client", text: "Sure, it's nine zero two one zero.", timestamp: 48 },
      { speaker: "ai", text: "Great, I found availability in your area. We can have a technician there today between two and four PM, or tomorrow morning between nine and eleven. Which works better for you?", timestamp: 52 },
      { speaker: "client", text: "Today between two and four would be perfect. I really want to get this fixed.", timestamp: 62 },
      { speaker: "ai", text: "Absolutely, I understand. I'm booking that now. Could I get your full name for the appointment?", timestamp: 68 },
      { speaker: "client", text: "It's Michael Thompson.", timestamp: 74 },
      { speaker: "ai", text: "Thank you, Michael. And what's the best phone number to reach you?", timestamp: 77 },
      { speaker: "client", text: "Six one nine, five five five, three four two one.", timestamp: 81 },
      { speaker: "ai", text: "Got it. And your address?", timestamp: 86 },
      { speaker: "client", text: "Fifteen twenty-three Oak Street, apartment B.", timestamp: 89 },
      { speaker: "ai", text: "Perfect. So to confirm, Michael, I have you scheduled for today between two and four PM at fifteen twenty-three Oak Street, apartment B. Our technician will call you about thirty minutes before arrival. Is there anything else I can help you with?", timestamp: 94 },
      { speaker: "client", text: "No, that covers everything. Thank you so much for your help!", timestamp: 108 },
      { speaker: "ai", text: "You're very welcome, Michael. We'll see you this afternoon. Have a great day!", timestamp: 113 },
    ],
  },
  {
    id: "law-office",
    title: "Law Office",
    image: officeImage,
    audioUrl: "",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Thompson and Associates Law Firm. This is Sarah, your virtual assistant. How may I direct your call today?", timestamp: 0 },
      { speaker: "client", text: "Hi, I need to schedule a consultation. I'm going through a divorce and need legal advice.", timestamp: 7 },
      { speaker: "ai", text: "I'm sorry to hear you're going through this difficult time. I'd be happy to help you schedule a consultation with one of our family law attorneys. Is this your first time contacting our firm?", timestamp: 13 },
      { speaker: "client", text: "Yes, it is. A friend recommended you.", timestamp: 22 },
      { speaker: "ai", text: "We appreciate the referral. Before I schedule your appointment, I have a few questions to help us prepare. Are there any children involved in the marriage?", timestamp: 26 },
      { speaker: "client", text: "Yes, we have two children, ages eight and twelve.", timestamp: 35 },
      { speaker: "ai", text: "I understand. And would you say this is an amicable situation, or do you anticipate there might be some disagreements regarding custody or assets?", timestamp: 39 },
      { speaker: "client", text: "It's... complicated. We haven't agreed on custody yet, and there's a house involved.", timestamp: 48 },
      { speaker: "ai", text: "Thank you for sharing that. Given the complexity of your situation, I'd like to schedule you with Attorney Rebecca Martinez. She specializes in family law with property division. She has availability Thursday at ten AM or Friday at three PM. Which would work better for you?", timestamp: 55 },
      { speaker: "client", text: "Thursday at ten works for me.", timestamp: 70 },
      { speaker: "ai", text: "Excellent. The initial consultation is one hour and there's a two hundred dollar consultation fee, which will be credited toward your retainer if you decide to proceed with our firm. Is that okay?", timestamp: 74 },
      { speaker: "client", text: "Yes, that's fine.", timestamp: 85 },
      { speaker: "ai", text: "Perfect. May I have your full name please?", timestamp: 88 },
      { speaker: "client", text: "Jennifer Lawson.", timestamp: 92 },
      { speaker: "ai", text: "Thank you, Jennifer. And your phone number?", timestamp: 95 },
      { speaker: "client", text: "It's four one five, five five five, seven eight nine zero.", timestamp: 98 },
      { speaker: "ai", text: "And your email address for confirmation?", timestamp: 104 },
      { speaker: "client", text: "J dot Lawson at email dot com.", timestamp: 107 },
      { speaker: "ai", text: "Perfect. I've scheduled your consultation with Attorney Martinez for Thursday at ten AM. You'll receive a confirmation email with our office address and a list of documents to bring. Is there anything else I can help you with?", timestamp: 111 },
      { speaker: "client", text: "No, that's everything. Thank you for being so helpful.", timestamp: 124 },
      { speaker: "ai", text: "You're welcome, Jennifer. We look forward to meeting you on Thursday. Take care.", timestamp: 129 },
    ],
  },
  {
    id: "cleaning",
    title: "Cleaning",
    image: industryCleaning,
    audioUrl: "",
    transcript: [
      { speaker: "ai", text: "Thank you for calling Sparkle Clean Services. I'm Sarah, your virtual assistant. How can I help you today?", timestamp: 0 },
      { speaker: "client", text: "Hi! I'd like to schedule a deep cleaning for my house.", timestamp: 6 },
      { speaker: "ai", text: "Wonderful! I'd be happy to help you with that. Let me gather some information to give you an accurate quote. First, how many bedrooms and bathrooms does your home have?", timestamp: 10 },
      { speaker: "client", text: "It's a three bedroom, two bathroom house.", timestamp: 19 },
      { speaker: "ai", text: "Great. And approximately how many square feet is the home?", timestamp: 23 },
      { speaker: "client", text: "It's about eighteen hundred square feet.", timestamp: 28 },
      { speaker: "ai", text: "Perfect. Do you have any pets? This helps us plan for any additional cleaning needs.", timestamp: 32 },
      { speaker: "client", text: "Yes, I have a golden retriever. There's quite a bit of dog hair around.", timestamp: 38 },
      { speaker: "ai", text: "No problem! We're experienced with pet-friendly homes. Are there any specific areas you'd like us to focus on, or any areas that need extra attention?", timestamp: 43 },
      { speaker: "client", text: "The kitchen definitely needs extra attention. I haven't had time to deep clean the oven and refrigerator in a while.", timestamp: 51 },
      { speaker: "ai", text: "Understood. We'll make sure to include those in the deep clean. Based on your home size and requirements, a deep cleaning would take approximately four to five hours and would cost three hundred twenty dollars. Does that work for you?", timestamp: 59 },
      { speaker: "client", text: "Yes, that sounds reasonable.", timestamp: 71 },
      { speaker: "ai", text: "Excellent! Let me check our schedule. We have availability this Saturday morning at nine AM, or next Monday at one PM. Which would you prefer?", timestamp: 75 },
      { speaker: "client", text: "Saturday morning works perfectly for me.", timestamp: 84 },
      { speaker: "ai", text: "Great choice! Can I get your full name?", timestamp: 88 },
      { speaker: "client", text: "It's Amanda Richards.", timestamp: 92 },
      { speaker: "ai", text: "And your address, Amanda?", timestamp: 95 },
      { speaker: "client", text: "Four fifty-six Maple Drive.", timestamp: 98 },
      { speaker: "ai", text: "Perfect. And a phone number where we can reach you?", timestamp: 102 },
      { speaker: "client", text: "Eight five eight, five five five, two three four five.", timestamp: 106 },
      { speaker: "ai", text: "Wonderful. You're all set for Saturday at nine AM. Our team will arrive with all necessary supplies and equipment. We'll send you a confirmation text with the details. Is there anything else I can help you with?", timestamp: 111 },
      { speaker: "client", text: "No, that's perfect. Thank you so much!", timestamp: 123 },
      { speaker: "ai", text: "You're welcome, Amanda! We look forward to making your home sparkle. Have a great day!", timestamp: 127 },
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
