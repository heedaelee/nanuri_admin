import mock from '../../MockConfig';
import crm from '../../db/dashboard/crm';

// Define all mocks of dashboard

mock.onGet('/dashboard/crm').reply(200, crm);
