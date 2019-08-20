import asyncio
import os

from autobahn.asyncio.component import Component
from autobahn.asyncio.component import run

comp = Component()

@comp.register('com.demo.test-python')
async def test(*args, **kwargs):
    print("Test handler has been called with args:", args, " Sleeping for 4 seconds...")
    await asyncio.sleep(4)
    print("Test handler has slept for 4 seconds.")
    if args != ('data-from-python',):
        print("Calling JavaScript...")
        result = await comp._session.call('com.demo.test-js', 'data-from-python')
        print("JavaScript returned: ", result)
    return 42

@comp.on_join
async def joined(session, details):
    print("We are connected!")
    print("Let's call JavaScript side")
    await session.call('com.demo.test-js', 'hi', 123)


class App:
    def __init__(self):
        self.components = []

    def register_component(self, component):
        from autobahn.wamp.component import _create_transport
        component._transports = [
            _create_transport(
                0,
                {
                    'type': 'websocket',
                    'url': os.getenv('WAMP_DEMO_URL', 'ws://localhost:8080/ws'),
                    'serializers': ['json'],
                },
                component._check_native_endpoint
            )
        ]
        component._realm = "demo"
        #component._authentication = {
        #    "ticket": {
        #        'ticket': os.getenv('WAMP_DEMO_BACKEND_SECRET', 'backend'),
        #        'authid': 'demo-backend',
        #    },
        #}
        self.components.append(component)

    def run(self):
        print("Running...")
        run(self.components)
        print("Bye.")


def create_app():
    app = App()
    for component in [comp]:
        app.register_component(component)
    return app
