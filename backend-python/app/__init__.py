from autobahn.asyncio.component import Component
from autobahn.asyncio.component import run

comp = Component()

@comp.register('com.dots.test')
async def test(*args, **kwargs):
    print("test begin")
    import asyncio
    await asyncio.sleep(10)
    print('test end')
    return 42

@comp.on_join
async def joined(session, details):
    print("session ready")
    await session.call('com.dots.test-js', 'hi', 123)


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
                    'url': 'ws://localhost:8080/ws',
                    'serializers': ['json'],
                },
                component._check_native_endpoint
            )
        ]
        component._realm = "dots"
        component._authentication = {
            "ticket": {
                # this key should be loaded from disk, database etc never burned into code like this...
                'ticket': 'backend',
                'authid': 'dots-backend',
            },
        }
        self.components.append(component)

    def run(self):
        run(self.components)


def create_app():
    app = App()
    for component in [comp]:
        app.register_component(component)
    return app
