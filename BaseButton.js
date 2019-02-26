const BaseButton = Vue.component('base-button', {
    props: {
        content: {
            type: String,
            required: true
        },
        enabled: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data() {
        return{
            loading:false
        }
    },
    computed: {
        loading_class() {
            return {
                'disabled-background': !this.enabled,
                'loading-background': this.loading
            }
        }
    },
    methods: {
        click() {
            if(!this.enabled) return;
            this.loading = true;
            setTimeout(() => {
                this.$emit('clicked');
                this.loading = false;
            }, 1000)
        }
    },
    template: `
        <div class="button" @click="click" :class="loading_class">
            {{content}}
        </div>
    `

})