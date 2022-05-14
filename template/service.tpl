import { Provide, Inject } from '@midwayjs/decorator';

import ProductMapping from '../mapping/shop/product';
import { BaseService } from '../../core/baseService';
import { ProductEntity } from '../entity/shop/product';

@Provide()
export default class  <%= identity %>Service extends BaseService {
  @Inject()
  protected mapping:  <%= identity %>Mapping;
}
