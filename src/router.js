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
			path: '/',
			name: 'LoginPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Login'));
				});
			},
		},
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
			path: '/Company',
			name: 'company',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Company/Company'));
				});
			},
		},
		{
			path: '/authority',
			name: 'quanxian',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Company/Authority'));
				});
			},
		},
		{
		path: '/Upload',
		name: 'UploadPage',
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('./routes/Company/CompanyUpload'));
			});
		},
	},
		{
		path: '/Math',
		name: 'cansshu',
		getComponent(nextState, cb) {
			require.ensure([], (require) => {
				cb(null, require('./routes/Math'));
			});
		},
	},
		{
			path: '/Email',
			name: 'youjian',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/info/Email'));
				});
			},
		},
		 {
				path: '/Sms',
				name: 'duanxin',
				getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/info/Sms'));
				});
			},
		},
			{
			path: '/Url',
			name: 'chartPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/info/Url'));
				});
			},
		},
			{
			path: '/Web',
			name: 'chartPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/info/Web'));
				});
			},
		},
			{
			path: '/Wechat',
			name: 'chartPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/info/Wechat'));
				});
			},
		},
		{
			path: '/chart',
			name: 'chartPage',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('./routes/Chart/Chart_detail'));
				});
			},
		},
    {
      path: '/watch',
      name: 'chartPage',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/Chart/Chart_watch'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
