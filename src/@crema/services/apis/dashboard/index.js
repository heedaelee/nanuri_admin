import crm from '../../db/dashboard/crm';
import mock from '../../MockConfig';

mock.onGet('/dashboard/crm').reply(200, crm);
