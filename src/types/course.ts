export type Course = {
  courseString: string; // "01:013:210" — use as ID
  expandedTitle: string; // "WORLD LITERATURE AND SOCIAL CHANGE"
  title: string;
  subject: string; // "013"
  subjectDescription: string; // "African, Middle Eastern, and South Asian Languages and Literatures"
  courseNumber: string; // "210"
  preReqNotes: string;
  credits: number; // 3
  sections: Section[];
};

export type Section = {
  index: string; // "00025" — the registration number, unique per section
  number: string; // "E1", "01", "H1"
  openStatus: boolean; // true - open
  instructorsText: string; // "MAGANO, THATO"
  sessionDates: string; // "05/26/2026 - 07/02/2026"
  meetingTimes: MeetingTime[];
};

export type MeetingTime = {
  meetingDay: string; // "M", "T", "" for online
  startTime: string; // "10:20" or ""
  endTime: string;
  campusName: string; // "ONLINE", "College Ave", etc.
  buildingCode: string;
  roomNumber: string;
  meetingModeDesc: string; // "ONLINE INSTRUCTION(INTERNET)", "LECTURE"
};

export type CourseFilters = {
  search: string;
  subjects: string[];
  campuses: string[];
  openOnly: boolean;
};

export const defaultFilters: CourseFilters = {
  search: "",
  subjects: [],
  campuses: [],
  openOnly: false,
};
