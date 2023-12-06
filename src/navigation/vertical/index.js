// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Account from 'mdi-material-ui/Account'
import Project from 'mdi-material-ui/Briefcase'
import Attendance from 'mdi-material-ui/Calendar'
import Leave from 'mdi-material-ui/Clipboard'
import Layers from 'mdi-material-ui/Layers'
import AppleKeyboardCommand from 'mdi-material-ui/AppleKeyboardCommand'
import FormatListBulleted from 'mdi-material-ui/FormatListBulleted'
import Microphone from 'mdi-material-ui/Microphone'
import TrophyAward from 'mdi-material-ui/TrophyAward'

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
      
      // roles: ["Admin", "Employee"]
    },
    {
      title: 'Attendance',
      icon: Attendance,
      path: '/attendance',

      // roles: ["Admin", "HR", "Employee"]
    },

    // {
    //   title: 'Clients',
    //   icon: AccountPlusOutline,
    //   path: '/clients',
    //   roles: ["Admin"]
    // },
    {
      title: 'Leave Management',
      icon: Leave,
      path: '/leave-management',

      // roles: ["Admin", "HR", "Employee"]
    },

    // {
    //   title: 'Accounts',
    //   icon: Book,
    //   path: '/accounts',
    //   roles: ["Admin"],
    //   children: [
    //     { name: "Income", link: "/pages/income" },
    //     { name: "Expenses", link: "/pages/expenses" },
    //     { name: "Invoices", link: "/pages/invoices" }
    //   ]
    // },
    {
      title: 'Departments',
      icon: Layers,
      path: '/departments',
      roles: ["Admin", "HR"]
    },

    // {
    //   title: 'Payroll',
    //   icon: AlertCircleOutline,
    //   path: '/payroll',
    //   roles: ["Admin", "HR"],
    //   children: [
    //     { name: "Payslip", link: "/pages/payslip" },
    //     { name: "Employee Salary", link: "/pages/employeeSalary" },
    //   ]
    // },
    {
      title: 'Job',
      icon: AppleKeyboardCommand,
      path: '/jobs',
      roles: ["Admin", "HR"]
    },

    // {
    //   title: 'Tracker',
    //   icon: Clock,
    //   path: '/tracker',
    //   roles: ["Employee", "HR"]
    // },
    {
      title: 'Options',
      icon: FormatListBulleted,
      path: '/options',
      roles: ["Admin"]
    },
    {
      title: 'Announcement',
      icon: Microphone,
      path: '/announcement',

      // roles: ["Employee", "Admin", "HR"]
    },
    {
      title: 'Awards',
      icon: TrophyAward,
      path: '/awards',

      // roles: ["Employee", "Admin", "HR"]
    },
  ]
}

export default navigation