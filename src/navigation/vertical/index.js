// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Project from 'mdi-material-ui/Briefcase'
import Attendance from 'mdi-material-ui/Calendar'
import Leave from 'mdi-material-ui/Clipboard'
import Book from 'mdi-material-ui/Book'
import Layers from 'mdi-material-ui/Layers'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { Clock } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Employees',
      icon: Account,
      path: '/employee',
    },
    {
      title: 'Projects',
      icon: Project,
      path: '/',
    },
    {
      title: 'Attendance',
      icon: Attendance,
      path: '/',
      children: [
        { name: "Today Attendance", link: "/pages/todayAttendance" },
        { name: "Employees Attendance", link: "/pages/employeeAttendance" }
      ]
    },
    {
      title: 'Clients',
      icon: AccountPlusOutline,
      path: '/',
    },
    {
      title: 'Leave Management',
      icon: Leave,
      path: '/',
      children: [
        { name: "All Leave Requests", link: "/pages/allLeaveRequest" },
        { name: "Leave Balance", link: "/pages/leaveBalance" },
        { name: "Leave Type", link: "/pages/leaveType" }
      ]
    },
    {
      title: 'Accounts',
      icon: Book,
      path: '/',
      children: [
        { name: "Income", link: "/pages/income" },
        { name: "Expenses", link: "/pages/expenses" },
        { name: "Invoices", link: "/pages/invoices" }
      ]
    },
    {
      title: 'Departments',
      icon: Layers,
      path: '/',
    },
    {
      title: 'Payroll',
      icon: AlertCircleOutline,
      path: '/',
      children: [
        { name: "Payslip", link: "/pages/payslip" },
        { name: "Employee Salary", link: "/pages/employeeSalary" },
      ]
    },
    {
      title: 'Job',
      icon: AlertCircleOutline,
      path: '/',
      children: [
        { name: "Requirements", link: "/pages/requirements" },
        { name: "Applicant List", link: "/pages/applicantList" },
      ]
    },
    {
      title: 'Tracker',
      icon: Clock,
      path: '/',
    },
    {
      title: 'Options',
      icon: AccountPlusOutline,
      path: '/',
    },
    {
      title: 'Announcement',
      icon: AccountPlusOutline,
      path: '/',
    },
    {
      title: 'Awards',
      icon: AccountPlusOutline,
      path: '/',
    },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
