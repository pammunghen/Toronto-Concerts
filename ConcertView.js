const ConcertView = Vue.component('concert-view', {
    props: {
        concert: {
            type: Object,
            required: true
        }
    },
    components: {
        BaseButton,
    },
    computed: {
        time() {
            const start = new Date(this.concert.start_time);

            let start_hour = start.getHours();
            let start_min = start.getMinutes();
            const start_pm = start_hour > 12 ? 'pm' : 'am';
            start_hour = start_hour % 12;

            return `${start.toDateString()} doors at ${start_hour} ${start_pm}`
        }
    },
    methods: {
        openMap() {
            const url = `https://www.google.com/maps/?q=${this.concert.place.name}`;
            window.open(url, '_blank');
        },
        deleteCard() {
            console.log(this.concert.id);
        }
    },
    template: `
        <div class="card">
            {{concert.name}}
            <div style="font-size:1.25rem">
                {{concert.place.name}} - {{time}}
            </div>

            <base-button :content="'View location on map'" @clicked="openMap"/>
            <base-button :content="'Delete'" @clicked="deleteCard"/>
        </div>
    `
})
