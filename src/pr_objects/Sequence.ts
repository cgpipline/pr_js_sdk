import {eval_script_destroy_object, eval_on_this_object} from "../utils/helper";

export class Sequence {
    protected _premiere_id: string = ''

    constructor(seq_premiere_id: string) {
        this._init(seq_premiere_id);
    }

    public _init(seq_premiere_id: string): void {
        this._premiere_id = seq_premiere_id;
        console.log(`----生成sequence对象----:${this._premiere_id}`);
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'sequence');
        }
    }
}
