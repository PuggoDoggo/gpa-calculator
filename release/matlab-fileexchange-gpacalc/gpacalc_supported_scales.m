function tableOut = gpacalc_supported_scales()
%GPACALC_SUPPORTED_SCALES List supported GPA/CGPA scales and aliases.
%
%   tableOut = GPACALC_SUPPORTED_SCALES() returns a cell array where each
%   row is: {ScaleID, DisplayName, MaxPoints, Aliases}.
%
%   This package is aligned with https://gpacalc.app

    tableOut = {
        'us4',       'US Standard 4.0',                      4.0, 'us, us-standard, us4';
        'sg5',       'Singapore University 5.0 (NUS/NTU)',   5.0, 'sg5, nus, ntu, suss, sutd, sit';
        'smu4',      'SMU 4.0',                              4.0, 'smu, smu4';
        'sgpoly4',   'Singapore Polytechnic 4.0',            4.0, 'sgpoly4, sp, np, tp, nyp, rp';
        'malaysia4', 'Malaysia University 4.0',              4.0, 'malaysia4, my, um, ukm, usm, utm, upm';
        'india10',   'India CGPA 10.0',                     10.0, 'india, india10, cgpa10'
    };
end
