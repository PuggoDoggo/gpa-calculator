function gpa = gpacalc_percentage_to_gpa(percentage, scaleId)
%GPACALC_PERCENTAGE_TO_GPA Convert percentage to GPA/CGPA.
%
%   gpa = GPACALC_PERCENTAGE_TO_GPA(percentage, scaleId)
%   uses a linear conversion baseline:
%     gpa = (percentage / 100) * maxScale
%
%   Note: institutions may use custom non-linear mappings.

    if nargin < 2 || isempty(scaleId)
        scaleId = 'us4';
    end

    s = gpacalc_get_scale(scaleId);
    percentage = min(max(double(percentage), 0), 100);
    gpa = (percentage ./ 100) .* s.max_points;
end
