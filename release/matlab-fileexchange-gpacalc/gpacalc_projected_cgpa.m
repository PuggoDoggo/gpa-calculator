function result = gpacalc_projected_cgpa(currentCgpa, completedCredits, gradesOrPoints, moduleCredits, scaleId)
%GPACALC_PROJECTED_CGPA Project cumulative CGPA from current profile.
%
%   result = GPACALC_PROJECTED_CGPA(currentCgpa, completedCredits,
%            gradesOrPoints, moduleCredits, scaleId)
%
%   Formula
%     projected = (currentCgpa * completedCredits + semesterPoints) / totalCredits
%     semesterPoints = sum(modulePoints .* moduleCredits)
%
%   Inputs
%     currentCgpa      - current cumulative GPA/CGPA (scalar)
%     completedCredits - earned credits before this semester (scalar)
%     gradesOrPoints   - grade labels (e.g. "A-", "B+") OR numeric points
%     moduleCredits    - credits for each module (same length as grades)
%     scaleId          - scale ID/alias, default 'sg5'
%
%   Output struct fields
%     projected_cgpa
%     semester_gpa
%     total_credits
%     semester_credits
%     cgpa_change
%     scale
%
%   Example
%     r = gpacalc_projected_cgpa(3.50, 60, ["A","A-","B+","B"], [4 4 4 4], 'nus');

    if nargin < 5 || isempty(scaleId)
        scaleId = 'sg5';
    end

    s = gpacalc_get_scale(scaleId);
    maxPoints = s.max_points;

    currentCgpa = double(currentCgpa);
    completedCredits = double(completedCredits);
    moduleCredits = double(moduleCredits);

    if ~isscalar(currentCgpa) || ~isscalar(completedCredits)
        error('currentCgpa and completedCredits must be scalars.');
    end

    if numel(gradesOrPoints) ~= numel(moduleCredits)
        error('gradesOrPoints and moduleCredits must have the same length.');
    end

    currentCgpa = min(max(currentCgpa, 0), maxPoints);
    completedCredits = max(completedCredits, 0);
    moduleCredits = max(moduleCredits(:), 0);

    [modulePoints, unknownMask] = gpacalc_grade_to_points(gradesOrPoints, scaleId);
    if any(unknownMask(:))
        badValues = string(gradesOrPoints(unknownMask));
        error('Unknown grade label(s): %s', strjoin(unique(badValues), ', '));
    end

    modulePoints = min(max(double(modulePoints(:)), 0), maxPoints);

    validMask = moduleCredits > 0;
    semesterCredits = sum(moduleCredits(validMask));
    semesterPoints = sum(modulePoints(validMask) .* moduleCredits(validMask));

    if semesterCredits > 0
        semesterGpa = semesterPoints / semesterCredits;
    else
        semesterGpa = 0;
    end

    if completedCredits > 0
        totalCredits = completedCredits + semesterCredits;
        if totalCredits > 0
            projectedCgpa = (currentCgpa * completedCredits + semesterPoints) / totalCredits;
        else
            projectedCgpa = 0;
        end
        if semesterCredits > 0
            cgpaChange = projectedCgpa - currentCgpa;
        else
            cgpaChange = NaN;
        end
    else
        projectedCgpa = semesterGpa;
        totalCredits = semesterCredits;
        cgpaChange = NaN;
    end

    result = struct();
    result.projected_cgpa = projectedCgpa;
    result.semester_gpa = semesterGpa;
    result.total_credits = totalCredits;
    result.semester_credits = semesterCredits;
    result.cgpa_change = cgpaChange;
    result.scale = s;
end
