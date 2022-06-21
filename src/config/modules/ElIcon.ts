/**
 * 自定义引入ElementPlus的Icon图标
*/

//===================引入全部ICON图标======================
//import * as icons from '@element-plus/icons-vue'
//===================引入全部ICON图标======================

//===================按需引入ICON图标======================
 import {
    User,Setting,ArrowDownBold,Search,House,Plus,
    ArrowUpBold,Expand,Avatar,
    Refresh,Key,Link,SwitchButton,Fold,
    Location,MoreFilled,InfoFilled,
    Document,Paperclip,ScaleToOriginal
} from '@element-plus/icons-vue'
//转变为响应式数据 json/arr
const icons = {
    'User': User,
    'Search': Search,
    'Link': Link,
    'Refresh': Refresh,
    'MoreFilled': MoreFilled,
    'Document': Document,
    'Paperclip': Paperclip,
    'ScaleToOriginal': ScaleToOriginal,

    'Avatar': Avatar,
    'Key': Key,
    'House': House,
    'InfoFilled': InfoFilled,

    'Location': Location,
    'Plus': Plus,

    'Setting': Setting,
    'ArrowDownBold': ArrowDownBold,
    'ArrowUpBold': ArrowUpBold,
    'Expand': Expand,
    'Fold': Fold,
    'SwitchButton': SwitchButton,
}
//===================按需引入ICON图标======================

export function ElIcon (options: { app: any }) {
    const { app } = options
    // 注册el-icon图标
    for (const iconName in icons) {
        if (Reflect.has(icons,iconName)) {
            app.component(iconName, (icons as any)[iconName])
        }
    }
}
