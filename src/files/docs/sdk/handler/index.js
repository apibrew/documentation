import {Client, Repository, GenericRecord} from '@apibrew/client';
import {Condition, HostedExtensionServiceImpl, PollerExtensionService} from '@apibrew/client/ext';

const handler = extensionService.handler(User); // or equivalent method for JS

// or
const handler = extensionService.handler(User.entityInfo);

// operate on event
handler.when(Condition.beforeCreate())
  .operate(event => {
    console.log("Before create:", event.user);
  });

// multiple conditions (AND)
// Note: The Java code has two identical 'after' conditions. Assuming this is an oversight, I've reduced it to one.
handler.when(Condition.after())
  .operate(event => {
    console.log("After create:", event.user);
  });

// you can also cancel handler when needed
let operatorId = handler.when(Condition.after())
  .operate(event => {
    console.log("After create:", event.user);
  });

// cancel handler
extensionService.unRegisterOperator(operatorId);
