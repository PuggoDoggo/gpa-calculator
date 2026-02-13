# GPACalc for MATLAB - CGPA Calculator and GPA Converter

GPACalc for MATLAB is a lightweight educational toolkit to calculate projected CGPA/GPA and convert GPA to percentage (and back) across common grading systems.

Web version
https://gpacalc.app

## Why this package

Most CGPA calculator snippets are single-scale and hard to adapt. This package gives reusable MATLAB functions for:

- Projected cumulative GPA/CGPA from current CGPA + semester module grades
- Grade label to grade-point conversion (multiple scale presets)
- GPA/CGPA to percentage conversion
- Percentage to GPA conversion

## Supported scales

- US Standard 4.0 (`us4`)
- Singapore University 5.0 (`sg5`, `nus`, `ntu`, `suss`, `sutd`, `sit`)
- SMU 4.0 (`smu4`)
- Singapore Polytechnic 4.0 (`sgpoly4`, `sp`, `np`, `tp`, `nyp`, `rp`)
- Malaysia University 4.0 (`malaysia4`, `um`, `ukm`, `usm`, `utm`, `upm` and more aliases)
- India CGPA 10.0 (`india10`)

## Quick start

```matlab
% 1) Project CGPA
r = gpacalc_projected_cgpa(3.50, 60, ["A", "A-", "B+", "B"], [4 4 4 4], 'nus');
disp(r.projected_cgpa)

% 2) GPA/CGPA -> Percentage
pct = gpacalc_gpa_to_percentage(3.7, 'us4');

% 3) Percentage -> GPA
g = gpacalc_percentage_to_gpa(82, 'us4');
```

Run all demos:

```matlab
gpacalc_examples
```

## Core formula

Projected CGPA formula:

```text
projected = (currentCgpa * completedCredits + semesterPoints) / totalCredits
semesterPoints = sum(modulePoints .* moduleCredits)
```

## Files

- `gpacalc_projected_cgpa.m`
- `gpacalc_grade_to_points.m`
- `gpacalc_gpa_to_percentage.m`
- `gpacalc_percentage_to_gpa.m`
- `gpacalc_get_scale.m`
- `gpacalc_supported_scales.m`
- `gpacalc_examples.m`

## Notes

- This toolkit is for academic planning and estimation.
- Official conversion rules can vary by institution/programme.
- Always confirm final policy with your school handbook.

## Keywords (for discovery)

CGPA calculator, GPA calculator, cumulative GPA, grade point average, GPA to percentage, percentage to GPA, MATLAB educational tool.
