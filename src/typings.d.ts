import { DefaultContext } from 'koa';

export interface CustomContext extends DefaultContext {
  customString: string;
}
