const httpFunction = require('./index');
const context = require('../defaultContext')

test('Http trigger should return known text', async () => {

    const request = {
        query: { name: 'Alex' }
    };

    await httpFunction(context, request);

    expect(context.log.mock.calls.length).toBe(1); // Kalder funktionen 1 gang!
    expect(context.res.body).toEqual('Hello Alex'); // Det forventede output der skal sammenlignes med det faktiske ouput
});