export type LocalePriority = 'p0' | 'p1' | 'p2';

export interface LocaleKeywordProfile {
  id: string;
  languageTag: string;
  pathPrefix: string;
  targetMarkets: string[];
  priority: LocalePriority;
  primaryTerms: string[];
  secondaryTerms: string[];
  blockedTerms: string[];
  notes: string;
}

export const localeKeywordProfiles: LocaleKeywordProfile[] = [
  {
    id: 'en-sg',
    languageTag: 'en-SG',
    pathPrefix: '/en-sg',
    targetMarkets: ['Singapore'],
    priority: 'p0',
    primaryTerms: ['gpa calculator singapore', 'cumulative gpa calculator'],
    secondaryTerms: ['nus gpa calculator', 'ntu gpa calculator', 'smu gpa calculator', 'cap calculator nus'],
    blockedTerms: ['ipk calculator', 'pngk calculator'],
    notes: '新加坡主语言版本，关键词以 GPA 为主，兼容 CAP 历史词。'
  },
  {
    id: 'en-my',
    languageTag: 'en-MY',
    pathPrefix: '/en-my',
    targetMarkets: ['Malaysia'],
    priority: 'p0',
    primaryTerms: ['cgpa calculator malaysia', 'gpa calculator malaysia'],
    secondaryTerms: ['cgpa to percentage malaysia', 'my university gpa calculator'],
    blockedTerms: ['ipk calculator'],
    notes: '马来西亚英语版本，兼容 CGPA/GPA 双词。'
  },
  {
    id: 'ms-my',
    languageTag: 'ms-MY',
    pathPrefix: '/ms-my',
    targetMarkets: ['Malaysia'],
    priority: 'p0',
    primaryTerms: ['kalkulator pngk', 'pengiraan pngk'],
    secondaryTerms: ['purata nilai gred kumulatif', 'kalkulator cgpa malaysia'],
    blockedTerms: ['cumulative gpa calculator'],
    notes: '马来语版本，必须覆盖 PNGK（Purata Nilai Gred Kumulatif）主词。'
  },
  {
    id: 'en-in',
    languageTag: 'en-IN',
    pathPrefix: '/en-in',
    targetMarkets: ['India'],
    priority: 'p0',
    primaryTerms: ['cgpa calculator', 'sgpa to cgpa', 'cgpa to percentage'],
    secondaryTerms: ['10 point cgpa calculator', 'semester gpa calculator'],
    blockedTerms: ['pngk calculator', 'ipk calculator'],
    notes: '印度先上英语版本，优先覆盖 CGPA/SGPA/百分比换算组合词。'
  },
  {
    id: 'en-pk',
    languageTag: 'en-PK',
    pathPrefix: '/en-pk',
    targetMarkets: ['Pakistan'],
    priority: 'p1',
    primaryTerms: ['cgpa calculator pakistan', 'minimum cgpa requirement'],
    secondaryTerms: ['cgpa out of 4', 'gpa calculator pakistan university'],
    blockedTerms: ['ipk calculator', 'pngk calculator'],
    notes: '巴基斯坦可作为第二阶段扩展，词法以 CGPA 为主。'
  },
  {
    id: 'en-bd',
    languageTag: 'en-BD',
    pathPrefix: '/en-bd',
    targetMarkets: ['Bangladesh'],
    priority: 'p1',
    primaryTerms: ['cgpa calculator bangladesh', 'minimum cgpa admission'],
    secondaryTerms: ['gpa to cgpa bangladesh', 'university cgpa requirement'],
    blockedTerms: ['ipk calculator', 'pngk calculator'],
    notes: '孟加拉高校常见 CGPA 门槛描述，可做第二阶段。'
  },
  {
    id: 'id-id',
    languageTag: 'id-ID',
    pathPrefix: '/id-id',
    targetMarkets: ['Indonesia'],
    priority: 'p2',
    primaryTerms: ['kalkulator ipk', 'hitung ipk'],
    secondaryTerms: ['ipk kumulatif', 'konversi nilai ke ipk'],
    blockedTerms: ['cgpa calculator malaysia', 'pngk calculator'],
    notes: '印尼应使用 IPK 词系，不建议直接翻译 CGPA 页面。'
  }
];

export const launchLocales = localeKeywordProfiles
  .filter((profile) => profile.priority === 'p0')
  .map((profile) => profile.id);
