// MobileNav.js - 移动端底部导航组件
export default {
    name: 'MobileNav',
    props: {
        currentView: {
            type: String,
            default: 'dashboard'
        }
    },
    emits: ['update:currentView'],
    setup(props, { emit }) {
        const navItems = [
            { id: 'dashboard', label: '首页', icon: '📊' },
            { id: 'analysis', label: '分析', icon: '📈' },
            { id: 'history', label: '历史', icon: '📜' },
            { id: 'settings', label: '设置', icon: '⚙️' }
        ]
        
        const handleNav = (view) => {
            emit('update:currentView', view)
        }
        
        return {
            navItems,
            handleNav
        }
    },
    template: `
        <nav class="mobile-nav">
            <div 
                v-for="item in navItems" 
                :key="item.id"
                class="mobile-nav-item"
                :class="{ active: currentView === item.id }"
                @click="handleNav(item.id)"
            >
                <span class="text-xl">{{ item.icon }}</span>
                <span class="text-xs">{{ item.label }}</span>
            </div>
        </nav>
    `
}
