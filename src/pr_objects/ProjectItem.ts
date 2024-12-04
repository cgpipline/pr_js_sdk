import {eval_script_destroy_object} from "../utils/helper";

export class ProjectItem {
    protected _premiere_id: string = ''

    constructor(p_item_premiere_id: string) {
        this._init(p_item_premiere_id);
    }

    public _init(p_item_premiere_id: string): void {
        this._premiere_id = p_item_premiere_id;
        console.log(`----生成ProjectItem对象----:${this._premiere_id}`);
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'ProjectItem');
        }
    }
}
