export interface SchoolSource {
  label: string;
  url: string;
}

export interface SchoolSEOContent {
  gradingNote: string;
  accuracyNote: string;
  sourceUrls: SchoolSource[];
}

export interface School {
  id: string;
  name: string;
  shortName: string;
  country: string;
  region: string;
  type: 'university' | 'polytechnic' | 'college';
  gradeScale: GradeOption[];
  maxGPA: number;
  seoContent?: SchoolSEOContent;
}

export interface GradeOption {
  grade: string;
  points: number;
  minScore?: number;
  maxScore?: number;
}

const sgUniversityGrades: GradeOption[] = [
  { grade: 'A+', points: 5.0 },
  { grade: 'A', points: 5.0 },
  { grade: 'A-', points: 4.5 },
  { grade: 'B+', points: 4.0 },
  { grade: 'B', points: 3.5 },
  { grade: 'B-', points: 3.0 },
  { grade: 'C+', points: 2.5 },
  { grade: 'C', points: 2.0 },
  { grade: 'D+', points: 1.5 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 }
];

const smuGrades: GradeOption[] = [
  { grade: 'A+', points: 4.0 },
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.7 },
  { grade: 'B+', points: 3.3 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.7 },
  { grade: 'C+', points: 2.3 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.7 },
  { grade: 'D+', points: 1.3 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 }
];

const sgPolyGrades: GradeOption[] = [
  { grade: 'A', points: 4.0 },
  { grade: 'B+', points: 3.5 },
  { grade: 'B', points: 3.0 },
  { grade: 'C+', points: 2.5 },
  { grade: 'C', points: 2.0 },
  { grade: 'D+', points: 1.5 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 }
];

const umGrades: GradeOption[] = [
  { grade: 'A+', points: 4.0 },
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.67 },
  { grade: 'B+', points: 3.33 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.67 },
  { grade: 'C+', points: 2.33 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.67 },
  { grade: 'D+', points: 1.33 },
  { grade: 'D', points: 1.0 },
  { grade: 'E', points: 0.0 }
];

const ukmGrades: GradeOption[] = [
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.67 },
  { grade: 'B+', points: 3.33 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.67 },
  { grade: 'C+', points: 2.33 },
  { grade: 'C', points: 2.0 },
  { grade: 'D', points: 1.0 },
  { grade: 'E', points: 0.0 }
];

const usmGrades: GradeOption[] = [
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.67 },
  { grade: 'B+', points: 3.33 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.67 },
  { grade: 'C+', points: 2.33 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.67 },
  { grade: 'D+', points: 1.33 },
  { grade: 'D', points: 1.0 },
  { grade: 'D-', points: 0.67 },
  { grade: 'E', points: 0.0 }
];

const utmGrades: GradeOption[] = [
  { grade: 'A+', points: 4.0 },
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.67 },
  { grade: 'B+', points: 3.33 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.67 },
  { grade: 'C+', points: 2.33 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.67 },
  { grade: 'D+', points: 1.33 },
  { grade: 'D', points: 1.0 },
  { grade: 'E', points: 0.0 }
];

const upmGrades: GradeOption[] = [
  { grade: 'A', points: 4.0 },
  { grade: 'A-', points: 3.75 },
  { grade: 'B+', points: 3.5 },
  { grade: 'B', points: 3.0 },
  { grade: 'B-', points: 2.75 },
  { grade: 'C+', points: 2.5 },
  { grade: 'C', points: 2.0 },
  { grade: 'C-', points: 1.75 },
  { grade: 'D+', points: 1.5 },
  { grade: 'D', points: 1.0 },
  { grade: 'F', points: 0.0 }
];

const indiaCGPAGrades: GradeOption[] = [
  { grade: 'O', points: 10.0, minScore: 90, maxScore: 100 },
  { grade: 'A+', points: 9.0, minScore: 80, maxScore: 89 },
  { grade: 'A', points: 8.0, minScore: 70, maxScore: 79 },
  { grade: 'B+', points: 7.0, minScore: 60, maxScore: 69 },
  { grade: 'B', points: 6.0, minScore: 55, maxScore: 59 },
  { grade: 'C', points: 5.0, minScore: 50, maxScore: 54 },
  { grade: 'P', points: 4.0, minScore: 40, maxScore: 49 },
  { grade: 'F', points: 0.0, minScore: 0, maxScore: 39 }
];

const usStandardGrades: GradeOption[] = [
  { grade: 'A+', points: 4.0, minScore: 97, maxScore: 100 },
  { grade: 'A', points: 4.0, minScore: 93, maxScore: 96 },
  { grade: 'A-', points: 3.7, minScore: 90, maxScore: 92 },
  { grade: 'B+', points: 3.3, minScore: 87, maxScore: 89 },
  { grade: 'B', points: 3.0, minScore: 83, maxScore: 86 },
  { grade: 'B-', points: 2.7, minScore: 80, maxScore: 82 },
  { grade: 'C+', points: 2.3, minScore: 77, maxScore: 79 },
  { grade: 'C', points: 2.0, minScore: 73, maxScore: 76 },
  { grade: 'C-', points: 1.7, minScore: 70, maxScore: 72 },
  { grade: 'D+', points: 1.3, minScore: 67, maxScore: 69 },
  { grade: 'D', points: 1.0, minScore: 63, maxScore: 66 },
  { grade: 'D-', points: 0.7, minScore: 60, maxScore: 62 },
  { grade: 'F', points: 0.0, minScore: 0, maxScore: 59 }
];

export const schools: School[] = [
  {
    id: 'nus',
    name: 'National University of Singapore',
    shortName: 'NUS',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: sgUniversityGrades,
    maxGPA: 5.0,
    seoContent: {
      gradingNote: 'NUS CAP is reported on a 5.0 scale and this page uses the standard NUS-style letter-point mapping for planning.',
      accuracyNote: 'Use this for letter-graded modules. S/U, CS/CU, and programme-specific grading rules should follow your faculty handbook.',
      sourceUrls: [
        { label: 'NUS Registrar Degree Requirements', url: 'https://nus.edu.sg/registrar/academic-information-policies/undergraduate-students/degree-requirements' },
        { label: 'NUS Registrar Academic Information', url: 'https://www.nus.edu.sg/registrar/academic-information-policies' }
      ]
    }
  },
  {
    id: 'ntu',
    name: 'Nanyang Technological University',
    shortName: 'NTU',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: sgUniversityGrades,
    maxGPA: 5.0,
    seoContent: {
      gradingNote: 'NTU undergraduate GPA/CGPA is on a 5.0 scale for degree classification.',
      accuracyNote: 'School-level policies can differ (for example pass/fail modules). Always verify your latest programme handbook before final decisions.',
      sourceUrls: [
        { label: 'NTU Undergraduate Admissions', url: 'https://www.ntu.edu.sg/admissions/undergraduate' },
        { label: 'NTU Official Website', url: 'https://www.ntu.edu.sg/' }
      ]
    }
  },
  {
    id: 'smu',
    name: 'Singapore Management University',
    shortName: 'SMU',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: smuGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'SMU cumulative GPA is on a 4.0 scale. This page uses SMU-style plus/minus mapping for term planning.',
      accuracyNote: 'School-specific rules (double counting, pass/fail options, graduation checks) should follow the latest SMU handbook.',
      sourceUrls: [
        { label: 'SMU Career Centre FAQ (CGPA out of 4.0)', url: 'https://careercentre.smu.edu.sg/students/faq' },
        { label: 'SMU Honours Classification', url: 'https://commencement.smu.edu.sg/graduation-and-academic-transcripts/honours-classification' }
      ]
    }
  },
  {
    id: 'suss',
    name: 'Singapore University of Social Sciences',
    shortName: 'SUSS',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: sgUniversityGrades,
    maxGPA: 5.0,
    seoContent: {
      gradingNote: 'SUSS honours references are on a 5-point CGPA framework, and this page follows that 5.0 planning scale.',
      accuracyNote: 'Course-level grading and progression can differ by programme. Use your programme handbook as final authority.',
      sourceUrls: [
        { label: 'SUSS Honours Classification', url: 'https://www.suss.edu.sg/full-time-undergraduate/how-to-apply/undergraduate-admission-requirements/honours-classification' },
        { label: 'SUSS Undergraduate Admissions', url: 'https://www.suss.edu.sg/full-time-undergraduate' }
      ]
    }
  },
  {
    id: 'sutd',
    name: 'Singapore University of Technology and Design',
    shortName: 'SUTD',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: sgUniversityGrades,
    maxGPA: 5.0,
    seoContent: {
      gradingNote: 'SUTD scholarship and student policy references commonly use a 5.0 GPA context.',
      accuracyNote: 'SUTD programme handbooks may include module-specific grading rules. Verify your cohort handbook for official submissions.',
      sourceUrls: [
        { label: 'SUTD Undergraduate Education', url: 'https://www.sutd.edu.sg/education/undergraduate/' },
        { label: 'SUTD Official Website', url: 'https://www.sutd.edu.sg/' }
      ]
    }
  },
  {
    id: 'sit',
    name: 'Singapore Institute of Technology',
    shortName: 'SIT',
    country: 'Singapore',
    region: 'asia',
    type: 'university',
    gradeScale: sgUniversityGrades,
    maxGPA: 5.0,
    seoContent: {
      gradingNote: 'SIT references cumulative GPA out of 5.0 for degree classification guidance.',
      accuracyNote: 'Some SIT programmes are run with partner-university grading variants. Confirm your specific programme handbook before using results officially.',
      sourceUrls: [
        { label: 'SIT FAQ (GPA out of 5.0)', url: 'https://www.singaporetech.edu.sg/faqs' },
        { label: 'SIT Degree Classification', url: 'https://www.singaporetech.edu.sg/admissions/undergraduate/requirements/degree-classification-singapore-institute-technology' }
      ]
    }
  },

  {
    id: 'sp',
    name: 'Singapore Polytechnic',
    shortName: 'SP',
    country: 'Singapore',
    region: 'asia',
    type: 'polytechnic',
    gradeScale: sgPolyGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'SP publishes GPA policy on a 4.0 scale. This calculator applies the SP-style polytechnic planning scale.',
      accuracyNote: 'Use this for letter-graded modules. Borderline cases such as disciplinary or attendance rules should follow the latest SP handbook.',
      sourceUrls: [
        { label: 'SP Grading System', url: 'https://www.sp.edu.sg/student-services/student-handbook/grading-system' },
        { label: 'SP Examination Results and Appeals', url: 'https://www.sp.edu.sg/student-services/student-handbook/examination-results-and-appeals' }
      ]
    }
  },
  {
    id: 'np',
    name: 'Ngee Ann Polytechnic',
    shortName: 'NP',
    country: 'Singapore',
    region: 'asia',
    type: 'polytechnic',
    gradeScale: sgPolyGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'NP academic assessment pages define GPA on a 4.0 framework for diploma progression.',
      accuracyNote: 'If your diploma has school-specific moderation rules, follow NP handbook guidance as final authority.',
      sourceUrls: [
        { label: 'NP Assessment', url: 'https://www.np.edu.sg/admissions-enrolment/academic-matters/assessment' },
        { label: 'NP Academic Matters', url: 'https://www.np.edu.sg/admissions-enrolment/academic-matters' }
      ]
    }
  },
  {
    id: 'tp',
    name: 'Temasek Polytechnic',
    shortName: 'TP',
    country: 'Singapore',
    region: 'asia',
    type: 'polytechnic',
    gradeScale: sgPolyGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'TP publishes school-level grading pages using a 4.0 GPA structure for diploma assessment.',
      accuracyNote: 'Different TP schools can publish detailed implementation notes. Confirm your school handbook for official decisions.',
      sourceUrls: [
        { label: 'TP BUS Grading System', url: 'https://www.tp.edu.sg/schools-and-courses/students/schools/bus/about-bus/BUS-Grading-System.html' },
        { label: 'TP Academic Calendar', url: 'https://www.tp.edu.sg/schools-and-courses/for-current-students/academic-calendar.html' }
      ]
    }
  },
  {
    id: 'nyp',
    name: 'Nanyang Polytechnic',
    shortName: 'NYP',
    country: 'Singapore',
    region: 'asia',
    type: 'polytechnic',
    gradeScale: sgPolyGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'NYP Student Handbook publishes assessment regulations and grade-point based progression rules.',
      accuracyNote: 'Attendance or promotion penalties can cap grades in specific cases. Always refer to the latest NYP handbook wording.',
      sourceUrls: [
        { label: 'NYP Assessment Regulations', url: 'https://mynypportal.nyp.edu.sg/en/student-handbook/shb-academic-matters/shb-assessment-regulations.html' },
        { label: 'NYP Attendance and Promotion Policy', url: 'https://mynypportal.nyp.edu.sg/en/student-handbook/shb-academic-matters/shb-attendance-and-promotion-policy.html' }
      ]
    }
  },
  {
    id: 'rp',
    name: 'Republic Polytechnic',
    shortName: 'RP',
    country: 'Singapore',
    region: 'asia',
    type: 'polytechnic',
    gradeScale: sgPolyGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'RP programmes are run on GPA-based academic standing similar to Singapore polytechnic 4.0 structures.',
      accuracyNote: 'RP public pages do not always expose a single global grade-point table. Verify your school or diploma handbook before final use.',
      sourceUrls: [
        { label: 'Republic Polytechnic Main Site', url: 'https://www.rp.edu.sg/' },
        { label: 'Republic Polytechnic Admissions', url: 'https://www.rp.edu.sg/admissions' }
      ]
    }
  },

  {
    id: 'um',
    name: 'Universiti Malaya',
    shortName: 'UM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: umGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UM official pages publish a 4.0 CGPA system with A/A- and plus/minus grade points.',
      accuracyNote: 'UM faculties can define programme-specific pass conditions. Follow your faculty handbook for official submission and appeal cases.',
      sourceUrls: [
        { label: 'UM Scheme for Marks and Grades', url: 'https://fsktm.um.edu.my/scheme-for-marks-and-grades' },
        { label: 'UM Foundation FAQ (Class and CGPA bands)', url: 'https://study.um.edu.my/faq-asasi' }
      ]
    }
  },
  {
    id: 'ukm',
    name: 'Universiti Kebangsaan Malaysia',
    shortName: 'UKM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: ukmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UKM faculty handbook references a 4.0 system with A to E grade points for programme classification.',
      accuracyNote: 'This page follows the published UKM handbook mapping. Faculty-specific rules may add progression conditions beyond grade points.',
      sourceUrls: [
        { label: 'UKM Undergraduate Handbook (Medicine 2024/2025 PDF)', url: 'https://www.ukm.my/ppukm/wp-content/uploads/2024/09/Buku-Panduan-Prasiswazah-Program-Perubatan-Sesi-Akademik-20242025.pdf' },
        { label: 'Study UKM FAQ (CGPA references)', url: 'https://studyukm.ukm.my/faq/' }
      ]
    }
  },
  {
    id: 'usm',
    name: 'Universiti Sains Malaysia',
    shortName: 'USM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: usmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'USM academic advising pages publish a 4.0 grade-point table that includes D- (0.67).',
      accuracyNote: 'Use this mapping for standard letter-graded modules. Programme-specific practical/clinical rules should follow your school regulations.',
      sourceUrls: [
        { label: 'USM School of Industrial Technology - Advice for Undergraduate Studies', url: 'https://it.usm.my/index.php/en/academic/undergraduate/academic-guardian/advice-for-undergraduate-studies' },
        { label: 'USM School of Mechanical Engineering - Advice for Undergraduate Studies', url: 'https://mech.usm.my/index.php/en/undergraduate/academic-advisor/advice-for-undergraduate-studies' }
      ]
    }
  },
  {
    id: 'utm',
    name: 'Universiti Teknologi Malaysia',
    shortName: 'UTM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UTM academic pages publish a 4.0 grade-point table with plus/minus mapping and class-of-degree bands.',
      accuracyNote: 'For official graduation or appeal decisions, follow the latest UTM Senate and faculty regulations.',
      sourceUrls: [
        { label: 'UTM What is your CGPA? (Grade table and class bands)', url: 'https://studentaffairs.utm.my/manfin/what-is-your-cgpa/' },
        { label: 'UTM Undergraduate Admissions', url: 'https://admission.utm.my/undergraduate-malaysian/' }
      ]
    }
  },
  {
    id: 'upm',
    name: 'Universiti Putra Malaysia',
    shortName: 'UPM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: upmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UPM Academic Matters Rules publish a 4.0 table with A- at 3.75 and B+ at 3.50 for many undergraduate programmes.',
      accuracyNote: 'UPM has programme-specific variants (for example medicine and veterinary). Use your programme rulebook as final authority.',
      sourceUrls: [
        { label: 'UPM Academic Matters Rules (Official PDF)', url: 'https://akademik.upm.edu.my/upload/dokumen/menul320240110122853BGAKA1_Academic_Matter_opti.pdf' },
        { label: 'UPM Faculty of Science Dean and Vice Chancellor List', url: 'https://fs.upm.edu.my/services/undergraduates/dean_and_vice_chancellor_lists-3020' }
      ]
    }
  },

  {
    id: 'india-cgpa',
    name: 'India CGPA System',
    shortName: 'India CGPA',
    country: 'India',
    region: 'asia',
    type: 'university',
    gradeScale: indiaCGPAGrades,
    maxGPA: 10.0
  },
  {
    id: 'us-standard',
    name: 'US Standard (4.0 Scale)',
    shortName: 'US 4.0',
    country: 'United States',
    region: 'north-america',
    type: 'university',
    gradeScale: usStandardGrades,
    maxGPA: 4.0
  }
];

export const schoolsByCountry = schools.reduce((acc, school) => {
  if (!acc[school.country]) {
    acc[school.country] = [];
  }
  acc[school.country].push(school);
  return acc;
}, {} as Record<string, School[]>);

export const sgUniversities = schools.filter((school) => school.country === 'Singapore' && school.type === 'university');
export const sgPolytechnics = schools.filter((school) => school.country === 'Singapore' && school.type === 'polytechnic');
export const myUniversities = schools.filter((school) => school.country === 'Malaysia');
