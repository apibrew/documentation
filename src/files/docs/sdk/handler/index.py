from apibrew import Client
from apibrew.ext import HostedExtensionServiceImpl, PollerExtensionService
from apibrew.sdk import Condition

# Assuming there's a similar 'extension_service' in Python
handler = extension_service.handler(User)  # or equivalent method for Python

# or
handler = extension_service.handler(User.entity_info)

# operate on event
def before_create_callback(event):
    print(f"Before create: {event.user}")

handler.when(Condition.before_create()).operate(before_create_callback)

# multiple conditions (AND)
# Note: The JavaScript code has one 'after' condition.
def after_create_callback(event):
    print(f"After create: {event.user}")

handler.when(Condition.after()).operate(after_create_callback)

# you can also cancel handler when needed
operator_id = handler.when(Condition.after()).operate(after_create_callback)

# cancel handler
extension_service.un_register_operator(operator_id)
