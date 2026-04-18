import { environment } from '../../environments/environment';

export const BE_URL = environment.apiBaseUrl;
export const SIDE_NAVIGATION = [
  {
    name: 'All Items',
    component: 'dashboard',
    link: '/dashboard',
  },

  {
    name: 'Add Images',
    component: 'memories',
    link: '/memories',
  },
  {
    name: 'Notes',
    component: 'notes',
    link: '/notes',
  },
  {
    name: 'Key Holders',
    component: 'key-holders',
    link: '/key-holders',
  },
  // {
  //   name: 'Assets',
  //   component: 'assets',
  //   link: '/assets',
  // },
  // {
  //   name: 'Passwords',
  //   component: 'passwords',
  //   link: '/passwords',
  // },
  {
    name: 'Obituary Info',
    component: 'obituary-info',
    link: '/obituary-info',
  },
  {
    name: 'Personal Info',
    link: '/personal-info',
    hidden: true,
  },

  // {
  //   name: 'Subscription Plans',
  //   component: 'subscription-plans',
  //   link: '/subscription-plans',
  // },
];

export const ADMIN_SIDE_NAVIGATION = [
  {
    name: 'user-management',
    component: 'users',
    link: '/admin/users',
  },
  {
    name: 'Subscription Plans',
    component: 'subscription-plans',
    link: '/subscription-plans',
  },
];

export const ADD_ITEMS_LIST = {
  VIDEOS: { text: 'Videos', label: 'videos' },
  AUDIOS: { text: 'Audios', label: 'audios' },
  MEMORIES: {
    text: 'Add Memories',
    label: 'memories',
  },
  NOTES: {
    text: 'Add Note',
    label: 'notes',
  },
  OBITUARY: {
    text: 'Add Obituary',
    label: 'obituary-info',
  },
  PASSWORDS: {
    text: 'Add Password',
    label: 'passwords',
  },
  ASSETS: {
    text: 'Add Asset',
    label: 'assets',
  },
  KEY_HOLDERS: {
    text: 'Add Key Holder',
    label: 'key-holders',
  },
  LEGACY: {
    text: 'Refer a Friend',
    label: 'key-holders',
  },
};

export const RELATION_LIST = [
  'Father',
  'Mother',
  'Son',
  'Daughter',
  'Husband',
  'Wife',
  'Brother',
  'Sister',
  'Friend',
  'Cousin',
  'Grandparents',
  'Grandchildren',
  'Other',
];

export const STAGE_GUIDANCE: Record<
  string,
  { title: string; intro: string[]; bullets: string[]; note?: string }
> = {
  '1-5': {
    title: 'Ages 1-5 years',
    intro: [
      'Focus on memories from this time. Here are some sample discussion topics. Remember you are leaving a part of yourself for others to cherish.',
    ],
    bullets: [
      'Who was present in your life?',
      'How were they related to you?',
      'Where did you live?',
      'What smells, artwork, characters do you recall?',
    ],
  },
  '5-10': {
    title: 'Ages 5-10 years',
    intro: [
      'Focus on memories from this time. Here are some sample discussion topics. Remember you are leaving a part of yourself for others to cherish.',
      'You can recall and/or show pictures of your school, friends, church, trips at this time in your life.',
      'Recall specific scents, songs, places, family members, traditions, sayings, etc.',
    ],
    bullets: [],
  },
  '10-20': {
    title: 'Ages 10 -20 years',
    intro: ['Focus on the pre-teen and teen aged years.'],
    bullets: [
      'What was new in your life - explorations?',
      'How did you feel about the opposite sex?',
      'Any new schools, friends or neighborhoods?',
      'What were the family values, morals or activities?',
      'Who were your favorite teachers and why?',
    ],
  },
  '20-30': {
    title: 'Ages 20-30 years',
    intro: ['Focus on your early adult years.'],
    bullets: [
      'What years were these? 1970 - 180 etc.',
      'Which college(s) did you attend?',
      'Where did you work (first job,etc)',
      'Who were you dating?',
      'Who did you marry and what was it like?',
      'Did your beliefs or behaviors change at this time? (Worldviews)',
      'Did you have children and who were they?',
      'What did you consider naming your children, why?',
    ],
  },
  '30-40': {
    title: 'Ages 30 - 40 years',
    intro: [],
    bullets: [
      'What have you gained at this time in your life? (maturity, insight)',
      'What challenges have you faced?',
      'How did you overcome challenges? (leave a guide for others to follow)',
      'What support systems did you have?',
      'Were you a support system for others?',
      'Did you discover faith?',
      'Did you know God?',
      'What belief system did you focus one and why?',
      'What significant life events occured? (marriages, deaths, births, break-ups, new love, etc)',
    ],
  },
  '40+': {
    title: 'Ages 40 and Up',
    intro: [],
    bullets: [
      'At this point in life did you feel you gained any Wisdom if so, how and what ?',
      'Did you have enough experience to be considered professional in any area of life? (if so, what?)',
      'Did you feel stronger than in your younger years? why or why not?',
      'What significant life events do you recall during tis time? (look/show pictures or videos)',
      'Sing a song. What does it mean to you?',
      'Recite a poem. What does it mean to you?',
      'What other life lessons do you want your loved ones to know about? why?',
    ],
  },
  'final-wishes': {
    title: 'Final Wishes',
    intro: [
      'This is not an official legal Will or Living Testament. This section only serves as a note to the key holder from the account user.',
    ],
    bullets: [],
  },
};

export const dateToIsoString = (dateObject: any) => {
  if (!dateObject || !dateObject.year || !dateObject.month || !dateObject.day) {
    return null;
  }
  // Format as YYYY-MM-DD for MySQL DATE type (no time, no timezone)
  const year = dateObject.year;
  const month = dateObject.month.toString().padStart(2, '0');
  const day = dateObject.day.toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isoStringToDateObj = (isoString: string) => {
  const dateObject = new Date(isoString);
  return {
    year: dateObject.getFullYear(),
    month: dateObject.getMonth() + 1,
    day: dateObject?.getDate(),
  };
};

export const objectToQueryParams = (obj: any) => {
  let queryArray = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryArray.push(`${key}=${obj[key]}`);
    }
  }
  return queryArray.join('&');
};
