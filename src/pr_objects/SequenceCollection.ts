import {eval_script_destroy_object, eval_on_this_object} from "../utils/helper";
import {Collection} from "./Collection";
import {Sequence} from "./Sequence";

export class SequenceCollection extends Collection {
    protected _self_instances: { [index: string]: Sequence } = {};
    private data: { [key: number]: Sequence | any };

    [key: number]: any;

    constructor(seq_premiere_id: string) {
        super();
        this.data = {};
        this._init(seq_premiere_id);
    }

    public _init(seq_premiere_id: string): void {
        this._premiere_id = seq_premiere_id;
        // 获取当前项目序列长度
        this.len = eval_on_this_object(this._premiere_id, 'numSequences')

        console.log(`----生成sequences对象----:${this._premiere_id}`);
        console.log(`----sequences长度----:` + this.len)
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
                            let _instances_obj: Sequence = new Sequence(instance_id);
                            this._self_instances[key.toString()] = _instances_obj;
                            console.log(`----获取单个sequence对象----:${instance_id}`);
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
            eval_script_destroy_object(this._premiere_id, 'sequences');
            if (Object.keys(this._self_instances).length) {
                for (const key in this._self_instances) {
                    this._self_instances[key].dispose();
                }
                this._self_instances = {};
            }
        }
    }
}
