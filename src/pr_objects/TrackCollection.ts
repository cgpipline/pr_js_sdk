import {Collection} from "./Collection";
import {eval_on_this_object, eval_script_destroy_object} from "../utils/helper";
import {Track} from "./Track";

export class TrackCollection extends Collection {

    protected _self_instances: { [index: string]: Track } = {};
    private data: { [key: number]: Track | any };

    [key: number]: any;

    constructor(track_premiere_id: string) {
        super();
        this.data = {};
        this._init(track_premiere_id);
    }

    public _init(track_premiere_id: string): void {
        this._premiere_id = track_premiere_id;
        // 获取当前项目序列长度
        this.len = eval_on_this_object(this._premiere_id, 'numTracks')

        console.log(`----生成tracks对象----:${this._premiere_id}`);
        console.log(`----tracks长度----:` + this.len)
        if (this.len > 0) {
            // 初始化对象数组
            for (let key: number = 0; key < this.len; key++) {
                this[key] = ''
            }
            for (let key = 0; key < this.len; key++) {
                Object.defineProperty(this, key, {
                    get: () => {
                        // 获取单个Sequence对象
                        if (this._self_instances[key.toString()]) {
                            return this._self_instances[key.toString()];
                        } else {
                            let instance_id: any = this.getItem(key, this._premiere_id, this.len);
                            let _instances_obj: Track = new Track(instance_id);
                            this._self_instances[key.toString()] = _instances_obj;
                            console.log(`----获取单个track对象----:${instance_id}`);
                            return _instances_obj
                        }
                    }
                });
            }
        }
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'tracks');
            if (Object.keys(this._self_instances).length) {
                for (const key in this._self_instances) {
                    this._self_instances[key].dispose();
                }
                this._self_instances = {};
            }
        }
    }
}
