const ConcertCreate = Vue.component('concert-create', {
    props: {
        venues: {
            type: Array,
            required: true
        }
    },
    components: {
        BaseButton
    },
    data() {
        return {
            name: '',
            place: '',
            start_date: new Date().toISOString().split('T')[0],
            start_time: '19:30',
        }
    },
    computed: {
        valid() {
            return !!(
                this.name.length &&
                this.place.length &&
                this.start_date.length &&
                this.start_time.length
            )
        }
    },
    watch: {
        venues() {
            this.place = this.venues[0];
        },
    },
    methods: {
        submit() {
            if (!this.valid) return;
    
            const payload = {
                name: this.name,
                place: {
                    name: this.place,
                },
                start_time: `${this.start_date}T${this.start_time}`
            }
    
            this.$root.$emit('new_concert', payload);
            // reset our name to an empty string
            this.name = '';
        }
    },
    template: `
        <div class="card">
            Who's playing?
            <input
                type="text"
                v-model="name"
                placeholder="Band name"
            />

            Where's it at?
            <select v-model="place">
                <option v-for="v in venues" :value="v">
                    {{v}}
                </option>
            </select>

            When are you gonna be there?
            <div>
                <input type="date" style="width:40%" v-model="start_date">
                at
                <input type="time" style="width:40%" v-model="start_time">
            </div>

            <base-button :content="'Submit'"
                :enabled="valid"
                @clicked="submit"
            />
        </div>
    `,
})