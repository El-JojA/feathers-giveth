import errors from 'feathers-errors';
import { setByDot } from 'feathers-hooks-common';

export default (field) => {
  return (context) => {
    if (context.params.provider === undefined) {
      if (context.method !== 'patch' && !context.data[field]) {
        throw new errors.GeneralError(`must provide when ${field} when calling creating or updating a internally`);
      }

      return context;
    }

    setByDot(context.data, field, context.params.user.address);
    return context;
  };
};