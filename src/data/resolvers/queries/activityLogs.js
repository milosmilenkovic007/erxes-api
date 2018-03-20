import { Customers, Companies, Users } from '../../../db/models';
import { moduleRequireLogin } from '../../permissions';
import {
  CustomerMonthActivityLogBuilder,
  CompanyMonthActivityLogBuilder,
  UserMonthActivityLogBuilder,
} from './activityLogUtils';

const activityLogQueries = {
  /**
   * Get activity log for customer
   * @param {Object} root
   * @param {Object} object2 - Graphql input data
   * @param {string} object._id - Customer id
   * @return {Promise} found customer
   */
  async activityLogsCustomer(root, { _id }) {
    const customer = await Customers.findOne({ _id });

    const customerMonthActivityLogBuilder = new CustomerMonthActivityLogBuilder(customer);
    return customerMonthActivityLogBuilder.build();
  },

  /**
   * Get activity log for company
   * @param {Object} root
   * @param {Object} object2 - Graphql input data
   * @param {string} object._id - Company id
   * @return {Promise} Promise resolving array of ActivityLogForMonth
   */
  async activityLogsCompany(root, { _id }) {
    const company = await Companies.findOne({ _id });

    const companyMonthActivityLogBuilder = new CompanyMonthActivityLogBuilder(company);
    return companyMonthActivityLogBuilder.build();
  },

  /**
   * Get activity logs for user
   * @param {String} _id - user id
   * @return {Promise} Promise resolving array of ActivityLogForMonth
   */
  async activityLogsUser(root, { _id }) {
    const user = await Users.findOne({ _id });

    const userMonthActivityLogBuilder = new UserMonthActivityLogBuilder(user);
    return userMonthActivityLogBuilder.build();
  },
};

moduleRequireLogin(activityLogQueries);

export default activityLogQueries;
