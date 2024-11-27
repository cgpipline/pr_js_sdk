import {check_premiere_is_alive} from '../utils/helper'
import {Application} from '../pr_objects/Application'

test('Premiere is alive test', async () => {
    const data:string = check_premiere_is_alive()
    expect(data).toBe('Premiere is alive')
});


test('init app object', async () => {
    const app = new Application()
    expect(app._premiere_id).toBe('Premiere is alive')
});
