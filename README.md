# GPA Calculator - Free Online Cumulative GPA & CGPA Calculator

Free online GPA calculator with school-specific grading scales. Calculate your cumulative GPA, project semester results, convert GPA to percentage, and plan grade targets. Built for university and polytechnic students in Singapore, Malaysia, India, and the United States.

**[Use the Calculator at gpacalc.app](https://gpacalc.app)**

![GPACalc - Free GPA Calculator](screenshot-homepage.png)

## Features

- **Cumulative GPA projection** - Enter your current CGPA and credits, add this semester's modules, and see your projected CGPA instantly
- **School-specific grading scales** - Pre-configured grade points for 18+ institutions across 4 countries
- **GPA to Percentage converter** - Convert GPA to percentage for 4.0, 5.0, and 10.0 scales
- **Percentage to GPA converter** - Convert percentage scores back to GPA
- **What-if scenarios** - Try different grade combinations to plan your target GPA
- **Shareable result cards** - Download your GPA result as a PNG image or share to WhatsApp, Telegram, X, and Facebook
- **No sign-up required** - Completely free, works in the browser, no account needed

## Supported Schools

### Singapore Universities (5.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| NUS | National University of Singapore | 5.0 |
| NTU | Nanyang Technological University | 5.0 |
| SMU | Singapore Management University | 4.0 |
| SUSS | Singapore University of Social Sciences | 5.0 |
| SUTD | Singapore University of Technology and Design | 5.0 |
| SIT | Singapore Institute of Technology | 5.0 |

### Singapore Polytechnics (4.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| SP | Singapore Polytechnic | 4.0 |
| NP | Ngee Ann Polytechnic | 4.0 |
| TP | Temasek Polytechnic | 4.0 |
| NYP | Nanyang Polytechnic | 4.0 |
| RP | Republic Polytechnic | 4.0 |

### Malaysia Universities (4.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| UM | Universiti Malaya | 4.0 |
| UKM | Universiti Kebangsaan Malaysia | 4.0 |
| USM | Universiti Sains Malaysia | 4.0 |
| UTM | Universiti Teknologi Malaysia | 4.0 |
| UPM | Universiti Putra Malaysia | 4.0 |

### Other Scales

- **US Standard** - 4.0 GPA scale
- **India CGPA** - 10.0 CGPA scale (with 9.5 multiplier for percentage conversion)

## How It Works

```
Projected CGPA = (Current CGPA x Credits Done + Semester Points) / Total Credits
Semester Points = Sum of (Grade Point x Module Credit)
```

1. Enter your current CGPA and completed credits
2. Select your school's grading scale
3. Add this semester's modules with expected grades and credit units
4. The calculator updates your projected CGPA in real time
5. Download or share the result card

## Use Cases

- **Semester planning** - See how expected grades affect your cumulative GPA before exams
- **Honours classification** - Check if you meet the GPA threshold for First Class, Second Upper, etc.
- **Scholarship applications** - Verify your GPA meets minimum requirements
- **Exchange programmes** - Project your GPA for application deadlines
- **Graduate school admission** - Convert and verify your GPA across different scales

## Tools Included

| Tool | URL | Description |
|------|-----|-------------|
| Cumulative GPA Calculator | [gpacalc.app](https://gpacalc.app) | Main calculator with CGPA projection |
| GPA to Percentage | [gpacalc.app/gpa-to-percentage](https://gpacalc.app/gpa-to-percentage) | Convert GPA to percentage |
| Percentage to GPA | [gpacalc.app/percentage-to-gpa](https://gpacalc.app/percentage-to-gpa) | Convert percentage to GPA |
| School-specific calculators | [gpacalc.app/schools](https://gpacalc.app/schools) | NUS, NTU, SMU, SP, NP, UM and more |

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

### Build

```bash
npm run build
```

Output goes to `dist/`.

## License

[MIT](LICENSE)
