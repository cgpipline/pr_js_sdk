import {eval_script_returning_object, eval_script_destroy_object} from "../utils/helper";
import {Project} from "./Project"

export class Application {

    private _premiere_id: string = ''
    private _projectObject: Project | null = null

    constructor() {
        this._init();
    }

    /**
     * 初始化对象
     * @private
     */
    public _init(): void {
        this._premiere_id = eval_script_returning_object('app', true);
        console.log(`----生成app对象----:${this._premiere_id}`);
    }

    /**
     * 获取project对象
     */
    get project(): Project {
        if (this._premiere_id) {
            if (!this._projectObject) {
                this._projectObject = new Project(this._premiere_id);
            }
            return this._projectObject;
        } else {
            throw new Error('premiere_id does not exist.');
        }
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'app');
            if (this._projectObject) {
                this._projectObject.dispose();
            }
        }
    }
}
