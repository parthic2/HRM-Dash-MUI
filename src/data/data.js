// Role mapping object
export const roleMapping = {
    hr: 1,
    employee: 2,
};

// Status mapping object
export const statusMapping = {
    active: 1,
    inactive: 2,
};

// Gender mapping object
export const genderMapping = {
    male: 1,
    female: 2,
};

// Blood Group object
export const bloodGroupMapping = {
    'a+': 1,
    'a-': 2,
    'b+': 3,
    'b-': 4,
    'ab+': 5,
    'ab-': 6,
    'o+': 7,
    'o-': 8,
};

// For active or Inactive status
export const statusObj = {
    Active: 'success',
    Inactive: 'error'
}

// Employee table cell
export const EmpHeadCells = [
    { id: 'employee name', label: 'Employee Name' },
    { id: 'designation', label: 'Designation' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    { id: 'mobile', label: 'Mobile No' },
    { id: 'alt', label: 'Alt. No' },
    { id: 'birth', label: 'Birth Date' },
    { id: 'joining', label: 'Joining Date' },
    { id: 'blood', label: 'Blood Group' },
    { id: 'role', label: 'Role' },
    { id: 'salary', label: 'Salary' },
    { id: 'holder', label: 'Bank Account Holder Name' },
    { id: 'account', label: 'Bank Account Number' },
    { id: 'bankName', label: 'Bank Name' },
    { id: 'ifsc', label: 'Bank IFSC Code' },
    { id: 'location', label: 'Bank Branch Location' },
    { id: 'document', label: 'Gov. Document' },
    { id: '', label: '' },
];

// Project table cell
export const ProjectHeadCells = [
    { id: 'project', label: 'Project Name' },
    { id: 'client', label: 'Client Name' },
    { id: 'email', label: 'Client Email' },
    { id: 'start', label: 'Start Date' },
    { id: 'end', label: 'End Date' },
    { id: 'status', label: 'Status' },
    { id: 'team', label: 'Team Member' },
    { id: 'document', label: 'Documents' },
    { id: '', label: '' },
];

// RoleWise Attendance table cell
export const RoleWiseHeadCells = [
    { id: 'name', label: 'Employee Name' },
    { id: 'date', label: 'Date' },
    { id: 'role', label: 'Role' },
    { id: 'in-time', label: 'In Time' },
    { id: 'out-time', label: 'Out Time' },
    { id: 'total-hours', label: 'Total Hours' },
    { id: 'status', label: 'Status' },
];

// Attendance tracker data
export const TrackerHeadCells = [
    { id: 'ip', label: 'IP' },
    { id: 'date', label: 'Date' },
    { id: 'role', label: 'Role' },
    { id: 'description', label: 'Description' },
    { id: 'start', label: 'Start Time' },
    { id: 'pause', label: 'Pause Time' },
    { id: 'stop', label: 'Stop Time' },
    { id: 'hours', label: 'Hours' },
    { id: 'minutes', label: 'Minutes' },
    { id: 'seconds', label: 'Seconds' },
];

// Leave Request cell data
export const LeaveReqHeadCells = [
    { id: 'date', label: 'Applying Date' },
    { id: 'type', label: 'Leave Type' },
    { id: 'start', label: 'Start Date' },
    { id: 'end', label: 'End Date' },
    { id: 'day', label: 'Days' },
    { id: 'description', label: 'Description' },
    { id: '', label: '' },
];

// Leave Balance cell data
export const LeaveBalHeadCells = [
    { id: 'name', label: 'Employee Name' },
    { id: 'type', label: 'Leave Type' },
    { id: 'entitled', label: 'Entitled' },
    { id: 'utilized', label: 'Utilized' },
    { id: 'balanced', label: 'Balanced' },
    { id: 'forward', label: 'Carried Forward' }
];

// Leave type cell data
export const LeaveTypeHeadCells = [
    { id: 'name', label: 'Leave Type Name' },
    { id: 'balance', label: 'Leave Type Balance' },
    { id: 'status', label: 'Status' },
    { id: 'date', label: 'Leave Type Adding Date' },
    { id: '', label: '' },
];

// Department cell data
export const DepartmentHeadCells = [
    { id: 'name', label: 'Department Name' },
    { id: 'head', label: 'Department Head' },
    { id: 'email', label: 'Department Email' },
    { id: 'start', label: 'Starting Date' },
    { id: 'team', label: 'Team Member' },
    { id: 'status', label: 'Status' },
];

// Job Requirement cell data
export const JobReqHeadCells = [
    { id: 'title', label: 'Job Title' },
    { id: 'position', label: 'Position' },
    { id: 'department', label: 'Department' },
    { id: 'noPosition', label: 'No. of position' },
    { id: 'description', label: 'Job Description' },
    { id: '', label: '' },
];

// Applicant List cell data
export const ApplicantHeadCells = [
    { id: 'name', label: 'Applicant Name' },
    { id: 'email', label: 'Applicant Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'cv', label: 'CV' },
    { id: '', label: '' },
];

// Announcement cell data
export const AnnouncementHeadCells = [
    { id: 'title', label: 'Announcement Title' },
    { id: 'detail', label: 'Announcement Details' },
    { id: 'department', label: 'Select Department' },
    { id: 'document', label: 'Document' },
    { id: '', label: '' },
];

// Award cell data
export const AwardHeadCells = [
    { id: 'name', label: 'Awards Name' },
    { id: 'details', label: 'Awards Details' },
    { id: 'employee', label: 'Employee' },
    { id: 'reward', label: 'Reward' },
    { id: '', label: '' },
];