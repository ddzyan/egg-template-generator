import { Provide, Inject } from '@midwayjs/decorator';

import { BaseService } from '../../core/baseService';
import { <%= identity %>Entity } from '../entity/<%= entity %>';

@Provide()
export default class  <%= identity %>Service extends BaseService {
  @Inject()
  protected mapping:  <%= identity %>Mapping;
}
