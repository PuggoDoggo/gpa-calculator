function percentage = gpacalc_gpa_to_percentage(gpa, scaleId)
%GPACALC_GPA_TO_PERCENTAGE Convert GPA/CGPA to percentage.
%
%   percentage = GPACALC_GPA_TO_PERCENTAGE(gpa, scaleId)
%
%   Conversion multipliers aligned with gpacalc.app:
%     4.0 scale  -> percentage = gpa * 25
%     5.0 scale  -> percentage = gpa * 20
%     10.0 scale -> percentage = gpa * 9.5 (common India CGPA rule)
%
%   The output is capped at 100.

    if nargin < 2 || isempty(scaleId)
        scaleId = 'us4';
    end

    s = gpacalc_get_scale(scaleId);
    gpa = min(max(double(gpa), 0), s.max_points);

    switch s.id
        case 'india10'
            multiplier = 9.5;
        case 'sg5'
            multiplier = 20.0;
        otherwise
            multiplier = 25.0;
    end

    percentage = min(100, gpa .* multiplier);
end
