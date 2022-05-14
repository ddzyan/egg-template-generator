import { Provide } from '@midwayjs/decorator';

import { <%= identity %>Entity } from '../entity/<%= entity %>';
import BaseMapping from '../../../core/baseMapping';

@Provide()
export default class  <%= identity %Mapping extends BaseMapping {
  protected get entity() {
    return  <%= identity %Entity;
  }
}
