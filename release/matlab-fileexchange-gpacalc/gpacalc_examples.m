% GPACALC_EXAMPLES Quick examples for MATLAB File Exchange users.

fprintf('--- GPACalc MATLAB Examples ---\n');

% Example 1: Projected CGPA (NUS/NTU 5.0)
r1 = gpacalc_projected_cgpa(3.50, 60, ["A", "A-", "B+", "B"], [4 4 4 4], 'nus');
fprintf('Example 1 - Projected CGPA (NUS): %.3f\n', r1.projected_cgpa);
fprintf('Example 1 - Semester GPA: %.3f\n\n', r1.semester_gpa);

% Example 2: India CGPA to percentage
pct = gpacalc_gpa_to_percentage(8.2, 'india10');
fprintf('Example 2 - 8.2 CGPA -> Percentage: %.2f%%\n\n', pct);

% Example 3: Percentage to GPA on 4.0 scale
g4 = gpacalc_percentage_to_gpa(82, 'us4');
fprintf('Example 3 - 82%% -> GPA(4.0): %.2f\n\n', g4);

% Example 4: Grade labels to points
[p, bad] = gpacalc_grade_to_points(["A", "B+", "C"], 'sgpoly4');
disp('Example 4 - Grade points (sgpoly4):');
disp(p);
disp('Unknown grade flags:');
disp(bad);

fprintf('\nWeb version\n');
fprintf('https://gpacalc.app\n');
