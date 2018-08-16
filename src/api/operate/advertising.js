import fetch from '@/utils/fetch';

/**
 * @name 查询所有广告列表
 * @param res
 */

export function getAdvertisementList(res) {
  return fetch({
    method: 'POST',
    url: '/publishing/advertisement/advertisementList',
    data: res,
  })
}