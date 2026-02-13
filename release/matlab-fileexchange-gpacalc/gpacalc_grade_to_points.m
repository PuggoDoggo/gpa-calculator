function [points, unknownMask] = gpacalc_grade_to_points(grades, scaleId)
%GPACALC_GRADE_TO_POINTS Convert letter grades to grade points.
%
%   [points, unknownMask] = GPACALC_GRADE_TO_POINTS(grades, scaleId)
%   converts grade labels using the selected scale.
%
%   Inputs
%     grades  - string/cellstr/char array of grades OR numeric points
%     scaleId - scale ID or alias (default: 'sg5')
%
%   Outputs
%     points      - numeric array (same shape as input)
%     unknownMask - logical array, true where grade is unknown
%
%   Example
%     [p, bad] = gpacalc_grade_to_points(["A","B+","C"], 'nus');

    if nargin < 2 || isempty(scaleId)
        scaleId = 'sg5';
    end

    if isnumeric(grades)
        points = grades;
        unknownMask = false(size(points));
        return;
    end

    s = gpacalc_get_scale(scaleId);
    labels = s.grade_labels;
    values = s.grade_points;

    if ischar(grades)
        grades = string({grades});
    elseif isstring(grades)
        % keep
    elseif iscellstr(grades)
        grades = string(grades);
    else
        error('grades must be numeric, char, string, or cellstr.');
    end

    originalSize = size(grades);
    flatGrades = upper(strtrim(grades(:)));
    pointsFlat = nan(numel(flatGrades), 1);
    unknownFlat = false(numel(flatGrades), 1);

    for i = 1:numel(flatGrades)
        idx = find(labels == flatGrades(i), 1, 'first');
        if isempty(idx)
            unknownFlat(i) = true;
        else
            pointsFlat(i) = values(idx);
        end
    end

    points = reshape(pointsFlat, originalSize);
    unknownMask = reshape(unknownFlat, originalSize);
end
