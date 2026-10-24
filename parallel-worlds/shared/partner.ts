import type { Scenario } from './domain';

export const EMBER_DATE = 'ember-date';

export interface PartnerBrief {
  name: string;
  age?: string;
  gender?: string;
  job?: string;
  city?: string;
  about?: string;
  prompt?: string;
  promptKicker?: string;
  looking?: string;
  interests?: string;
  distance?: string;
  education?: string;
  height?: string;
  zodiac?: string;
  family?: string;
  weekends?: string;
  saturday?: string;
  sunday?: string;
  surprise?: string;
  photo?: string;
}

function clip(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

/** A first-date scenario for whoever is on screen in the dating app. */
export function scenarioFromPartner(raw: unknown): Scenario | null {
  if (!raw || typeof raw !== 'object') return null;
  const body = raw as Record<string, unknown>;
  const name = clip(body.name, 40);
  if (!/^[\p{L}][\p{L}\s'.-]{0,39}$/u.test(name)) return null;
  const age = clip(body.age, 8);
  const gender = clip(body.gender, 24);
  const job = clip(body.job, 80);
  const city = clip(body.city, 80);
  const about = clip(body.about, 400);
  const prompt = clip(body.prompt, 240);
  const promptKicker = clip(body.promptKicker, 80);
  const looking = clip(body.looking, 80);
  const interests = clip(body.interests, 300);
  const distance = clip(body.distance, 40);
  const education = clip(body.education, 80);
  const height = clip(body.height, 24);
  const zodiac = clip(body.zodiac, 40);
  const family = clip(body.family, 80);
  const weekends = clip(body.weekends, 120);
  const saturday = clip(body.saturday, 160);
  const sunday = clip(body.sunday, 160);
  const surprise = clip(body.surprise, 240);
  const interestList = interests.split(',').map(item => item.trim()).filter(Boolean);
  const facts = [
    gender && `Gender: ${gender}.`,
    age && `Age: ${age}.`,
    job && `Work: ${job}.`,
    education && `Education: ${education}.`,
    interestList.length && `Hobbies: ${interestList.join(', ')}.`,
    looking && `Looking for: ${looking}.`,
    height && `Height: ${height}.`,
    city && `City: ${city}.`,
    distance && `Distance: ${distance}.`,
    zodiac && `Zodiac: ${zodiac}.`,
    family && `Family plans: ${family}.`,
    weekends && `Weekends: ${weekends}.`,
    saturday && `Saturday: ${saturday}.`,
    sunday && `Sunday: ${sunday}.`,
    about && `About: ${about}`,
    surprise && `A surprising thing: ${surprise}`,
    prompt && `${promptKicker || 'A line you might say'}: ${prompt}`,
  ].filter(Boolean).join(' ');
  const who = [name, age && `${age} years old`, gender, job, education && `education ${education}`].filter(Boolean).join(', ');
  return {
    id: EMBER_DATE,
    title: `First date with ${name}`,
    setting: `An early evening first date in a quiet neighborhood café. You are ${who}${distance ? `, ${distance}` : ''}. You and the other person are getting to know each other as equals.`,
    character: {
      id: EMBER_DATE,
      name,
      description: about || `${name} is here for a first date and wants a real conversation.`,
      traits: interestList.length ? interestList : ['present', 'curious', 'honest'],
      values: ['honesty', 'mutual respect', looking || 'authentic connection'],
      motivation: `These facts are the dating profile on screen. Answer as this person and do not change your name, age, gender, education, or hobbies. ${facts}`,
      speakingStyle: 'Keep every reply to one or two short spoken sentences. You are speaking aloud, not writing: no lists, no markdown. Mention a hobby or your education when it fits naturally. A short follow-up is fine; do not interrogate.',
      voice: 'default',
    },
  };
}

export function briefFromSearch(search: string): PartnerBrief | null {
  const query = new URLSearchParams(search);
  const brief: PartnerBrief = {
    name: query.get('partner') || '',
    age: query.get('age') || '',
    gender: query.get('gender') || '',
    job: query.get('job') || '',
    city: query.get('city') || '',
    about: query.get('about') || '',
    prompt: query.get('prompt') || '',
    promptKicker: query.get('promptKicker') || '',
    looking: query.get('looking') || '',
    interests: query.get('interests') || '',
    distance: query.get('distance') || '',
    education: query.get('education') || '',
    height: query.get('height') || '',
    zodiac: query.get('zodiac') || '',
    family: query.get('family') || '',
    weekends: query.get('weekends') || '',
    saturday: query.get('saturday') || '',
    sunday: query.get('sunday') || '',
    surprise: query.get('surprise') || '',
    photo: query.get('photo') || '',
  };
  return scenarioFromPartner(brief) ? brief : null;
}
