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
        { label: 'SMU Career Services FAQ (CGPA out of 4.0)', url: 'https://careerservices.smu.edu.sg/employers/frequently-asked-questions-employers' },
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
      gradingNote: 'SUSS uses a 5-point CGPA framework for undergraduate planning, and this page follows that 5.0 scale.',
      accuracyNote: 'Course-level grading and progression can differ by programme. Use your programme handbook as final authority.',
      sourceUrls: [
        { label: 'SUSS Full-time Undergraduate Programmes', url: 'https://www.suss.edu.sg/academics/programmes/full-time-undergraduate' },
        { label: 'SUSS Full-time Undergraduate Admission Criteria', url: 'https://www.suss.edu.sg/admissions/application-process/eligibility/full-time-undergraduate-admission-criteria' }
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
        { label: 'NYP Student Handbook', url: 'https://mynypportal.nyp.edu.sg/en/student-handbook.html' }
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
      gradingNote: 'UM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty-level handbooks can define programme-specific rules. Use your latest UM programme handbook as final authority.',
      sourceUrls: [
        { label: 'UM Official Website', url: 'https://www.um.edu.my/' },
        { label: 'UM Study Portal', url: 'https://study.um.edu.my/' }
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
      gradingNote: 'UKM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty-specific regulations can differ. Use your latest UKM faculty handbook for official progression checks.',
      sourceUrls: [
        { label: 'UKM Portal', url: 'https://www.ukm.my/portal/' },
        { label: 'UKM Main Website', url: 'https://www.ukm.my/portalukm/' }
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
      gradingNote: 'USM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Programme-level grading details may vary by school. Use your latest USM handbook for official decisions.',
      sourceUrls: [
        { label: 'USM Official Website', url: 'https://www.usm.my/en/' },
        { label: 'USM Admissions', url: 'https://admissions.usm.my/' }
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
      gradingNote: 'UTM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty rules can differ by programme. Use the latest UTM academic regulations as final authority.',
      sourceUrls: [
        { label: 'UTM Official Website', url: 'https://www.utm.my/' },
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
      gradingNote: 'UPM uses a 4.0 CGPA framework. This page keeps UPM-specific planning points used in UPM academic materials.',
      accuracyNote: 'UPM has programme-level variants. Use your programme handbook and official UPM regulations for final decisions.',
      sourceUrls: [
        { label: 'UPM Official Website', url: 'https://www.upm.edu.my/' },
        { label: 'UPM Academic Portal', url: 'https://akademik.upm.edu.my/' },
        { label: 'UPM Academic Matters Rules (Official PDF)', url: 'https://akademik.upm.edu.my/upload/dokumen/menul320240110122853BGAKA1_Academic_Matter_opti.pdf' },
      ]
    }
  },
  {
    id: 'uitm',
    name: 'Universiti Teknologi MARA',
    shortName: 'UiTM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UiTM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Programme handbooks can have specific progression and graduation rules. Verify with your latest UiTM faculty handbook.',
      sourceUrls: [
        { label: 'UiTM Official Website', url: 'https://www.uitm.edu.my/' },
        { label: 'UiTM Study Portal', url: 'https://study.uitm.edu.my/' }
      ]
    }
  },
  {
    id: 'iium',
    name: 'International Islamic University Malaysia',
    shortName: 'IIUM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'IIUM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Kulliyyah-level requirements can differ. Verify with the latest IIUM academic regulations for official submission.',
      sourceUrls: [
        { label: 'IIUM Official Website', url: 'https://www.iium.edu.my/v2/' },
        { label: 'IIUM Academics', url: 'https://www.iium.edu.my/v2/academics/' }
      ]
    }
  },
  {
    id: 'uum',
    name: 'Universiti Utara Malaysia',
    shortName: 'UUM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UUM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'School-level regulations may vary. Verify with the latest UUM handbook for official progression decisions.',
      sourceUrls: [
        { label: 'UUM Official Website', url: 'https://www.uum.edu.my/' },
        { label: 'UUM Admissions', url: 'https://admission.uum.edu.my/' }
      ]
    }
  },
  {
    id: 'ums',
    name: 'Universiti Malaysia Sabah',
    shortName: 'UMS',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UMS uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty and programme handbooks remain the final authority for progression or graduation checks.',
      sourceUrls: [
        { label: 'UMS Official Website', url: 'https://www.ums.edu.my/v6/' },
        { label: 'UMS Academic Admission Information', url: 'https://www.ums.edu.my/v6/index.php/academic/admission-ums' }
      ]
    }
  },
  {
    id: 'unimas',
    name: 'Universiti Malaysia Sarawak',
    shortName: 'UNIMAS',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UNIMAS uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'UNIMAS programme handbooks can define additional rules. Verify the latest handbook before official use.',
      sourceUrls: [
        { label: 'UNIMAS Gazette', url: 'https://gazette.unimas.my/' },
        { label: 'UNIMAS Directory', url: 'https://directory.unimas.my/' }
      ]
    }
  },
  {
    id: 'upsi',
    name: 'Universiti Pendidikan Sultan Idris',
    shortName: 'UPSI',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UPSI uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty and programme regulations may vary. Use your latest UPSI handbook for official decisions.',
      sourceUrls: [
        { label: 'UPSI Official Website', url: 'https://www.upsi.edu.my/' },
        { label: 'UPSI Admission', url: 'https://www.upsi.edu.my/admission/' }
      ]
    }
  },
  {
    id: 'umt',
    name: 'Universiti Malaysia Terengganu',
    shortName: 'UMT',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UMT uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'For official progression and graduation checks, refer to UMT academic regulations for your programme.',
      sourceUrls: [
        { label: 'UMT Official Website', url: 'https://www.umt.edu.my/' },
        { label: 'UMT Study Information', url: 'https://www.umt.edu.my/study/' }
      ]
    }
  },
  {
    id: 'uthm',
    name: 'Universiti Tun Hussein Onn Malaysia',
    shortName: 'UTHM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UTHM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Programme-specific rules may differ. Use the latest UTHM handbook before relying on results for official decisions.',
      sourceUrls: [
        { label: 'UTHM Official Website', url: 'https://www.uthm.edu.my/en/' },
        { label: 'UTHM Admission', url: 'https://admission.uthm.edu.my/' }
      ]
    }
  },
  {
    id: 'usim',
    name: 'Universiti Sains Islam Malaysia',
    shortName: 'USIM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'USIM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty-level regulations remain the final authority. Verify with the latest USIM programme handbook.',
      sourceUrls: [
        { label: 'USIM Official Website', url: 'https://www.usim.edu.my/' },
        { label: 'USIM Admission', url: 'https://www.usim.edu.my/admission/' }
      ]
    }
  },
  {
    id: 'umpsa',
    name: 'Universiti Malaysia Pahang Al-Sultan Abdullah',
    shortName: 'UMPSA',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UMPSA uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Programme regulations can vary by faculty. Verify your latest UMPSA handbook for official use.',
      sourceUrls: [
        { label: 'UMPSA Official Website', url: 'https://www.umpsa.edu.my/en' },
        { label: 'UMPSA Admission', url: 'https://admission.umpsa.edu.my/' }
      ]
    }
  },
  {
    id: 'unimap',
    name: 'Universiti Malaysia Perlis',
    shortName: 'UniMAP',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UniMAP uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty rules may include additional conditions. Use your latest UniMAP handbook for official decisions.',
      sourceUrls: [
        { label: 'UniMAP Official Website', url: 'https://www.unimap.edu.my/index.php/en/' },
        { label: 'UniMAP Admission', url: 'https://admission.unimap.edu.my/' }
      ]
    }
  },
  {
    id: 'utem',
    name: 'Universiti Teknikal Malaysia Melaka',
    shortName: 'UTeM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UTeM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Programme-specific regulations can vary. Verify with the latest UTeM academic handbook for official use.',
      sourceUrls: [
        { label: 'UTeM Official Website', url: 'https://www.utem.edu.my/en/' },
        { label: 'UTeM Undergraduate Information', url: 'https://www.utem.edu.my/en/undergraduate.html' }
      ]
    }
  },
  {
    id: 'unisza',
    name: 'Universiti Sultan Zainal Abidin',
    shortName: 'UniSZA',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UniSZA uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'Faculty and programme handbooks remain the final authority for official progression and graduation checks.',
      sourceUrls: [
        { label: 'UniSZA Official Website', url: 'https://www.unisza.edu.my/' },
        { label: 'UniSZA Admission', url: 'https://www.unisza.edu.my/admission/' }
      ]
    }
  },
  {
    id: 'umk',
    name: 'Universiti Malaysia Kelantan',
    shortName: 'UMK',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UMK uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'For official use, verify programme-level rules in the latest UMK academic regulations handbook.',
      sourceUrls: [
        { label: 'UMK Official Website', url: 'https://www.umk.edu.my/en/' },
        { label: 'UMK Academic Regulations', url: 'https://www.umk.edu.my/en/academics/academic-regulations-book.html' }
      ]
    }
  },
  {
    id: 'upnm',
    name: 'Universiti Pertahanan Nasional Malaysia',
    shortName: 'UPNM',
    country: 'Malaysia',
    region: 'asia',
    type: 'university',
    gradeScale: utmGrades,
    maxGPA: 4.0,
    seoContent: {
      gradingNote: 'UPNM uses a 4.0 CGPA framework for degree planning. This page applies a Malaysian university 4.0 planning scale.',
      accuracyNote: 'For official decisions, always refer to the latest UPNM academic handbook and programme regulations.',
      sourceUrls: [
        { label: 'MOHE Media Statement on UPNM Leadership', url: 'https://www.mohe.gov.my/en/broadcast/media-statements/siaran-media-leftenan-jeneral-datuk-arman-rumaizi-hj-ahmad-dilantik-naib-canselor-upnm-ke-8' },
        { label: 'Malaysia Ministry of Higher Education', url: 'https://www.mohe.gov.my/en' }
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
