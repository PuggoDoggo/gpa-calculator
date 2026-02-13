function scale = gpacalc_get_scale(scaleId)
%GPACALC_GET_SCALE Get grade-point mapping for a GPA/CGPA scale.
%
%   scale = GPACALC_GET_SCALE(scaleId) returns a struct with fields:
%   id, name, max_points, grade_labels, grade_points.
%
%   Supported IDs: us4, sg5, smu4, sgpoly4, malaysia4, india10.
%   Aliases are also accepted, e.g. 'nus', 'ntu', 'sp', 'um', 'india'.
%
%   Example
%     s = gpacalc_get_scale('nus');

    if nargin < 1 || isempty(scaleId)
        scaleId = 'sg5';
    end

    key = lower(strtrim(string(scaleId)));

    switch key
        case {"us", "us-standard", "us4"}
            scale.id = 'us4';
            scale.name = 'US Standard 4.0';
            scale.max_points = 4.0;
            scale.grade_labels = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"];
            scale.grade_points = [4.0,4.0,3.7,3.3,3.0,2.7,2.3,2.0,1.7,1.3,1.0,0.7,0.0];

        case {"sg", "sg5", "nus", "ntu", "suss", "sutd", "sit"}
            scale.id = 'sg5';
            scale.name = 'Singapore University 5.0';
            scale.max_points = 5.0;
            scale.grade_labels = ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"];
            scale.grade_points = [5.0,5.0,4.5,4.0,3.5,3.0,2.5,2.0,1.5,1.0,0.0];

        case {"smu", "smu4"}
            scale.id = 'smu4';
            scale.name = 'SMU 4.0';
            scale.max_points = 4.0;
            scale.grade_labels = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","F"];
            scale.grade_points = [4.0,4.0,3.7,3.3,3.0,2.7,2.3,2.0,1.7,1.3,1.0,0.0];

        case {"sgpoly", "sgpoly4", "sp", "np", "tp", "nyp", "rp"}
            scale.id = 'sgpoly4';
            scale.name = 'Singapore Polytechnic 4.0';
            scale.max_points = 4.0;
            scale.grade_labels = ["A","B+","B","C+","C","D+","D","F"];
            scale.grade_points = [4.0,3.5,3.0,2.5,2.0,1.5,1.0,0.0];

        case {"my", "malaysia", "malaysia4", "um", "ukm", "usm", "utm", "upm", "uitm", "iium", "uum", "ums", "unimas", "upsi", "umt", "uthm", "usim", "umpsa", "unimap", "utem", "unisza", "umk", "upnm"}
            scale.id = 'malaysia4';
            scale.name = 'Malaysia University 4.0';
            scale.max_points = 4.0;
            scale.grade_labels = ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","E","F"];
            scale.grade_points = [4.0,4.0,3.67,3.33,3.0,2.67,2.33,2.0,1.67,1.33,1.0,0.0,0.0];

        case {"india", "india10", "cgpa10"}
            scale.id = 'india10';
            scale.name = 'India CGPA 10.0';
            scale.max_points = 10.0;
            scale.grade_labels = ["O","A+","A","B+","B","C","P","F"];
            scale.grade_points = [10.0,9.0,8.0,7.0,6.0,5.0,4.0,0.0];

        otherwise
            error('Unsupported scaleId: %s. Run gpacalc_supported_scales() for valid values.', scaleId);
    end
end
