import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/index',
      name: 'IndexPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/IndexPage'));
        });
      },
    },
    {
      path: '/users',
      name: 'UsersPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/users'));
          cb(null, require('./routes/Users'));
        });
      },
    },
		{
			path: '/',
			name: 'LoginPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Login'));
				});
			},
		},
		{
			path: '/chart',
			name: 'chartPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Chart'));
				});
			},
		},
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
