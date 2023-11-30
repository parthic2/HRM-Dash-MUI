// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Project from 'mdi-material-ui/Briefcase'
import Attendance from 'mdi-material-ui/Calendar'
import Leave from 'mdi-material-ui/Clipboard'
import Book from 'mdi-material-ui/Book'
import Layers from 'mdi-material-ui/Layers'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import { Clock } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Employees',
      icon: Account,
      path: '/employee',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Projects',
      icon: Project,
      path: '/projects',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Attendance',
      icon: Attendance,
      path: '/attendance',
      roles: ["Admin", "HR"],
      children: [
        { name: "Today Attendance", link: "/pages/todayAttendance" },
        { name: "Employees Attendance", link: "/pages/employeeAttendance" }
      ]
    },
    {
      title: 'Clients',
      icon: AccountPlusOutline,
      path: '/clients',
      roles: ["Admin"]
    },
    {
      title: 'Leave Management',
      icon: Leave,
      path: '/leave-management',
      roles: ["Admin", "HR", "Employee"],
      children: [
        { name: "All Leave Requests", link: "/pages/allLeaveRequest" },
        { name: "Leave Balance", link: "/pages/leaveBalance" },
        { name: "Leave Type", link: "/pages/leaveType" }
      ]
    },
    {
      title: 'Accounts',
      icon: Book,
      path: '/accounts',
      roles: ["Admin"],
      children: [
        { name: "Income", link: "/pages/income" },
        { name: "Expenses", link: "/pages/expenses" },
        { name: "Invoices", link: "/pages/invoices" }
      ]
    },
    {
      title: 'Departments',
      icon: Layers,
      path: '/departments',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Payroll',
      icon: AlertCircleOutline,
      path: '/payroll',
      roles: ["Admin", "HR"],
      children: [
        { name: "Payslip", link: "/pages/payslip" },
        { name: "Employee Salary", link: "/pages/employeeSalary" },
      ]
    },
    {
      title: 'Job',
      icon: AlertCircleOutline,
      path: '/jobs',
      roles: ["Admin", "HR"],
      children: [
        { name: "Requirements", link: "/pages/requirements" },
        { name: "Applicant List", link: "/pages/applicantList" },
      ]
    },
    {
      title: 'Tracker',
      icon: Clock,
      path: '/tracker',
      roles: ["Employee", "HR"]
    },
    {
      title: 'Options',
      icon: AccountPlusOutline,
      path: '/options',
      roles: ["Admin"]
    },
    {
      title: 'Announcement',
      icon: AccountPlusOutline,
      path: '/announcement',
      roles: ["Employee", "Admin", "HR"]
    },
    {
      title: 'Awards',
      icon: AccountPlusOutline,
      path: '/awards',
      roles: ["Employee", "Admin", "HR"]
    },
  ]
}

export default navigation