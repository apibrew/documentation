import io.apibrew.client.Client;
import io.apibrew.client.ext.Condition;
import io.apibrew.client.ext.ExtensionService;
import io.apibrew.client.ext.Handler;
import io.apibrew.client.ext.Operator;
import io.apibrew.client.ext.impl.PollerExtensionService;

// prepare handler
Handler<User> handler = extensionService.handler(User.class);

// or
Handler<User> handler = extensionService.handler(User.entityInfo);

// operate on event
handler.when(Condition.beforeCreate())
        .operate(Operator.execute((event, user) -> {
    System.out.println("Before create:" + user);
}));

// multiple conditions (AND)
handler.when(Condition.after())
        .when(Condition.after())
        .operate(Operator.execute((event, user) -> {
    System.out.println("After create:" + user);
}));

// you can also cancel handler when needed
String operatorId = handler.when(Condition.after())
        .when(Condition.after())
        .operate(Operator.execute((event, user) -> {
    System.out.println("After create:" + user);
}));

// cancel handler
extensionService.unRegisterOperator(operatorId);


