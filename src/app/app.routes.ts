import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';
import { EngageComponent } from './pages/engage/engage.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AllUserComponent } from './pages/all-user/all-user.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HrLayoutComponent } from './layout/hr-layout/hr-layout.component';
import { ManagerHomeComponent } from './pages/manager-home/manager-home.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserDocumentCenterComponent } from './pages/user-document-center/user-document-center.component';
import { PayslipComponent } from './pages/payslip/payslip.component';
import { UserPeopleComponent } from './pages/user-people/user-people.component';
import { TaskComponent } from './pages/task/task.component';
import { KudoComponent } from './pages/kudo/kudo.component';

import { RequestHubComponent } from './pages/request-hub/request-hub.component';
import { UserFeedbackComponent } from './pages/user-feedback/user-feedback.component';
import { ApplyLeavesComponent } from './pages/apply-leaves/apply-leaves.component';
import { HrGenerateSalaryComponent } from './pages/hr-generate-salary/hr-generate-salary.component';
import { ManagerPeopleComponent } from './pages/manager-people/manager-people.component';
import { ManagerHelpdeskComponent } from './pages/manager-helpdesk/manager-helpdesk.component';
import { ManagerReviewComponent } from './pages/manager-review/manager-review.component';
import { ManagerKudosComponent } from './pages/manager-kudos/manager-kudos.component';
import { ManagerFeedbackComponent } from './pages/manager-feedback/manager-feedback.component';
import { ManagerTaskComponent } from './pages/manager-task/manager-task.component';
import { ManagerDocumentCenterComponent } from './pages/manager-document-center/manager-document-center.component';
import { HrKudosComponent } from './pages/hr-kudos/hr-kudos.component';
import { HrReviewComponent } from './pages/hr-review/hr-review.component';
import { HrFeedbackComponent } from './pages/hr-feedback/hr-feedback.component';
import { HrTaskComponent } from './pages/hr-task/hr-task.component';
import { HrPeopleComponent } from './pages/hr-people/hr-people.component';
import { HrHelpdeskComponent } from './pages/hr-helpdesk/hr-helpdesk.component';
import { HrDocumentCentreComponent } from './pages/hr-document-centre/hr-document-centre.component';
import { ManagerAllLeaveRequestComponent } from './pages/manager-all-leave-request/manager-all-leave-request.component';
import { HolidayComponent } from './pages/holidays/holidays.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { LeaveStatusComponent } from './pages/leave-status/leave-status.component';
import { HrAddEmployeeComponent } from './pages/hr-add-employee/hr-add-employee.component';
import { ManagerPyslipComponent } from './pages/manager-pyslip/manager-pyslip.component';
import { HelpDeskComponent } from './pages/helpdesk/helpdesk.component';
import { UserCalenderComponent } from './pages/user-calender/user-calender.component'
import { RegularizationComponent } from './pages/regularization/regularization.component';
import { HrRegularizationComponent } from './pages/hr-regularization/hr-regularization.component';
import { ManagerApplyleaveComponent } from './pages/manager-applyleave/manager-applyleave.component';
import { ManagerLeaveStatusComponent } from './pages/manager-leave-status/manager-leave-status.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ItStatementComponent } from './pages/it-statement/it-statement.component';
import { YtdReportsComponent } from './pages/ytd-reports/ytd-reports.component';
import { ReimbursementPayslipComponent } from './pages/reimbursement-payslip/reimbursement-payslip.component';
import { LoanStatementComponent } from './pages/loan-statement/loan-statement.component';
// import { HrRegularizationComponent } from './pages/hr-regularization/hr-regularization.component';






export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy-policy', component:PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component:TermsAndConditionComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent },


  // ... other routes



  // 🔐 Dashboard routes with AuthGuard
  { path: 'dashboard/manager', component: ManagerLayoutComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  { path: 'dashboard/hr', component: HrLayoutComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'dashboard/user', component: UserLayoutComponent, canActivate: [AuthGuard], data: { role: 'USER' } },

  // 📌 Manager Layout Route
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      { path: 'manager-home', component: ManagerHomeComponent, canActivate: [AuthGuard] },
      { path: 'it-statement', component: ItStatementComponent, canActivate: [AuthGuard]  },
      { path: 'manager/engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'manager-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'manager-all-user', component: AllUserComponent, canActivate: [AuthGuard] },
      { path: 'manager/people', component: ManagerPeopleComponent, canActivate: [AuthGuard] },
      { path: 'manager/helpdesk', component: ManagerHelpdeskComponent, canActivate: [AuthGuard] },
      { path: 'manager/MyWorklife/kudos', component: ManagerKudosComponent, canActivate: [AuthGuard] },
      { path: 'manager/todo/review', component: ManagerReviewComponent, canActivate: [AuthGuard] },
      { path: 'manager/MyWorklife/feedback', component: ManagerFeedbackComponent, canActivate: [AuthGuard] },
      { path: 'manager/todo/tasks', component: ManagerTaskComponent, canActivate: [AuthGuard] },
      { path: 'manager/document-centre', component: ManagerDocumentCenterComponent, canActivate: [AuthGuard] },
      { path: 'manager/all-leave-request', component: ManagerAllLeaveRequestComponent, canActivate: [AuthGuard] },
      { path: 'manager/create-holiday', component: HolidayComponent, canActivate: [AuthGuard] },
       { path: 'manager/pay-slip', component: ManagerPyslipComponent, canActivate: [AuthGuard] },
       { path: 'manager/manager-applyleave', component: ManagerApplyleaveComponent, canActivate: [AuthGuard] },
        { path: 'manager/manager-leave-status', component: ManagerLeaveStatusComponent, canActivate: [AuthGuard] },
        { path: 'it-statement', component: ItStatementComponent, canActivate: [AuthGuard] },
        { path: 'ytd-reports', component: YtdReportsComponent, canActivate: [AuthGuard] },
       { path: 'reimbursement-payslip', component: ReimbursementPayslipComponent, canActivate: [AuthGuard] },
        { path: 'loan-statment', component: LoanStatementComponent, canActivate: [AuthGuard] },


        
    ]
  },
  // 📌 Hr Layout Route
  {
    path: '',
    component: HrLayoutComponent,
    children: [
      { path: 'hr-home', component: HrHomeComponent, canActivate: [AuthGuard] },
      { path: 'hr-add-employee', component: HrAddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'hr-all-user', component: AllUserComponent, canActivate: [AuthGuard] },
      { path: 'hr/engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'hr-generate-salary', component: HrGenerateSalaryComponent, canActivate: [AuthGuard] },
      { path: 'hr/MyWorklife/kudos', component: HrKudosComponent, canActivate: [AuthGuard] },
      { path: 'hr/todo/review', component: HrReviewComponent, canActivate: [AuthGuard] },
      { path: 'hr/todo/tasks', component: HrTaskComponent, canActivate: [AuthGuard] },
      { path: 'hr/MyWorklife/feedback', component: HrFeedbackComponent, canActivate: [AuthGuard] },
      { path: 'hr/document-centre', component: HrDocumentCentreComponent, canActivate: [AuthGuard] },
      { path: 'hr/people', component: HrPeopleComponent, canActivate: [AuthGuard] },
      { path: 'hr/helpdesk', component: HrHelpdeskComponent, canActivate: [AuthGuard] },
      { path: 'hr/all-leave-request', component: ManagerAllLeaveRequestComponent, canActivate: [AuthGuard] },
      { path: 'hr/holiday', component: HolidayComponent, canActivate: [AuthGuard] },
      { path: 'hr/regular', component: HrRegularizationComponent, canActivate: [AuthGuard] },
    

    ]
  },

  // 📌 User Layout Route
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard] },
      { path: 'user/pay-slip', component: PayslipComponent, canActivate: [AuthGuard] },
      { path: 'user/document-centre', component: UserDocumentCenterComponent, canActivate: [AuthGuard] },
      { path: 'user/people', component: UserPeopleComponent, canActivate: [AuthGuard] },
      { path: 'user/my-worklife/kudo', component: KudoComponent, canActivate: [AuthGuard] },
      { path: 'user/to-do/task', component: TaskComponent, canActivate: [AuthGuard] },
      { path: 'user/to-do/review', component: TaskComponent, canActivate: [AuthGuard] },
      { path: 'user/engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'user/Helpdesk', component: HelpDeskComponent, canActivate: [AuthGuard] },
      { path: 'Workflow Delegates/request-hub', component: RequestHubComponent, canActivate: [AuthGuard] },
      { path: 'user/my-worklife/feedback', component: UserFeedbackComponent, canActivate: [AuthGuard] },
      { path: 'user/leaves/apply-leaves', component: ApplyLeavesComponent, canActivate: [AuthGuard] },
      { path: 'user/leaves/leaves-status', component: LeaveStatusComponent, canActivate: [AuthGuard] },
      { path: 'user/attendece/attendence-info', component: UserCalenderComponent, canActivate: [AuthGuard] },
       { path: 'user/attendance/report', component: RegularizationComponent, canActivate: [AuthGuard] },
       



    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];
