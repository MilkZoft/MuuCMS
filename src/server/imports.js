// Importing APIs
import blogAPI from './app/blog/blog.api';
import pagesAPI from './app/pages/pages.api';
import usersAPI from './app/users/users.api';
import contactAPI from './app/contact/contact.api';
import commentAPI from './app/comment/comment.api';
import forgotPasswordAPI from './app/forgotPassword/forgotPassword.api';

// Importing Dashboards
import appDashboard from './app/dashboard/app.dashboard';

// Importing Models
import blogModel from './app/blog/blog.model';
import dashboardModel from './app/dashboard/dashboard.model';
import pagesModel from './app/pages/pages.model';
import usersModel from './app/users/users.model';
import contactModel from './app/contact/contact.model';
import commentModel from './app/comment/comment.model';
import forgotPassModel from './app/forgotPassword/forgotPassword.model';

export default app => {
  // API
  app.use(blogAPI);
  app.use(pagesAPI);
  app.use(usersAPI);
  app.use(contactAPI);
  app.use(commentAPI);
  app.use(forgotPasswordAPI);

  // Dashboard
  app.use(appDashboard);

  // Model
  app.use(blogModel);
  app.use(dashboardModel);
  app.use(pagesModel);
  app.use(usersModel);
  app.use(contactModel);
  app.use(commentModel);
  app.use(forgotPassModel);
};
