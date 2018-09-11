// Importing APIs
import dashboardAPI from './app/dashboard/dashboard.api';
import usersAPI from './app/users/users.api';

// Importing Dashboards
import appDashboard from './app/dashboard/dashboard.app';

// Importing Models
import dashboardModel from './app/dashboard/dashboard.model';
import usersModel from './app/users/users.model';

export default app => {
  // Dashboard
  app.use(appDashboard);

  // Model
  app.use(dashboardModel);
  app.use(usersModel);

  // API
  app.use(dashboardAPI);
  app.use(usersAPI);
};
