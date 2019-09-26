import { GrowthHacks } from '../../../db/models';
import { checkPermission, moduleRequireLogin } from '../../permissions/wrappers';
import { IListParams } from './boards';
import { generateGrowthHackCommonFilters } from './boardUtils';

interface IGrowthHackListParams extends IListParams {
  hackStage?: string;
  limit?: number;
}

const growthHackQueries = {
  /**
   * Growth hack list
   */
  async growthHacks(_root, args: IGrowthHackListParams) {
    const filter = await generateGrowthHackCommonFilters(args);
    const { sortField, sortDirection, skip = 0, limit = 10 } = args;

    const sort: { [key: string]: any } = {};

    if (sortField) {
      sort[sortField] = sortDirection;
    }

    sort.order = 1;
    sort.createdAt = -1;

    return GrowthHacks.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  /**
   * Get all users count. We will use it in pager
   */
  async growthHacksTotalCount(_root, args: IGrowthHackListParams) {
    const filter = await generateGrowthHackCommonFilters(args);

    return GrowthHacks.find(filter).countDocuments();
  },

  async growthHacksPriorityMatrix(_root, args: IListParams) {
    const filter = await generateGrowthHackCommonFilters(args);

    filter.ease = { $exists: true, $gt: 0 };
    filter.impact = { $exists: true, $gt: 0 };

    return GrowthHacks.find(filter);
  },

  /**
   * Growth hack detail
   */
  growthHackDetail(_root, { _id }: { _id: string }) {
    return GrowthHacks.findOne({ _id });
  },
};

moduleRequireLogin(growthHackQueries);

checkPermission(growthHackQueries, 'growthHacks', 'showGrowthHacks', []);

export default growthHackQueries;
