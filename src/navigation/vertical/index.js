// ** Icon imports
import DashboardIcon from "mdi-material-ui/HomeAccount";
import EmployeeIcon from "mdi-material-ui/AccountGroup";
import CalendarIcon from "mdi-material-ui/CalendarCheck";
import AnnouncementIcon from "mdi-material-ui/Microphone";
import AwardIcon from "mdi-material-ui/TrophyAward";
import OptionIcon from "mdi-material-ui/SwapHorizontal";
import JobIcon from "mdi-material-ui/AppleKeyboardCommand";
import DepartmentIcon from "mdi-material-ui/LayersTriple";
import ProjectIcon from "mdi-material-ui/HumanGreetingProximity";
import LeaveIcon from "mdi-material-ui/ClipboardAlert";
import AttendanceIcon from "mdi-material-ui/CalendarClock";

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: DashboardIcon,
      path: '/',
      roles: ["Admin", "HR"]
    },
    {
      sectionTitle: 'Pages',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Employees',
      icon: EmployeeIcon,
      path: '/employee',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Projects',
      icon: ProjectIcon,
      path: '/projects',

      // roles: ["Admin", "Employee"]
    },
    {
      title: 'Attendance',
      icon: AttendanceIcon,
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
      icon: LeaveIcon,
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
      icon: DepartmentIcon,
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
      icon: JobIcon,
      path: '/jobs',
      roles: ["Admin", "HR"]
    },
    {
      title: 'Calendar',
      icon: CalendarIcon,
      path: '/calendar',
      roles: ["Admin", "HR"]
    },
    
    // {
    //   title: 'Options',
    //   icon: OptionIcon,
    //   path: '/options',
    //   roles: ["Admin"]
    // },
    {
      title: 'Announcement',
      icon: AnnouncementIcon,
      path: '/announcement',

      // roles: ["Employee", "Admin", "HR"]
    },
    {
      title: 'Awards',
      icon: AwardIcon,
      path: '/awards',

      // roles: ["Employee", "Admin", "HR"]
    },
  ]
}

export default navigation